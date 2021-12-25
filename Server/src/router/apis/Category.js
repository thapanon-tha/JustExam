const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Category.controller');

// all
router.get('/', controller.getAllCategory);

// teacher only
router.post('/', controller.addCategory);

// all
router.get('/:id', controller.getCategory);

// all
router.put('/:id', controller.updateCategory);

// no one
router.delete('/:id', controller.deleteCategory);

module.exports = router;
