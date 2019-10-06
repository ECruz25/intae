const router = require('express').Router();
const pageController = require('./pageController');
const withAuth = require('../Authentication/middleware');

router.get('/main', pageController.getMainPage);
router.get('/byCategory/:id', pageController.getByCategory);
router.get('/:id', pageController.get);
router.get('/', pageController.getAll);
router.post('/', withAuth, pageController.create);
router.put('/', withAuth, pageController.update);
router.put('/main', withAuth, pageController.updateMainPage);

module.exports = router;
