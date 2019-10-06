const router = require('express').Router();
const userController = require('./userController');
const withAuth = require('../Authentication/middleware');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.post('/authenticate', userController.authenticate);
router.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});
module.exports = router;
