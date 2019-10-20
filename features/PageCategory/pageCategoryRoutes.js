const router = require('express').Router();
const pageCategoryController = require('./pageCategoryController');
const withAuth = require('../Authentication/middleware');

router.get('/', pageCategoryController.getAll);
router.get('/:id', pageCategoryController.get);
router.post('/', withAuth, pageCategoryController.create);
router.delete('/', withAuth, pageCategoryController.delete);

module.exports = router;
