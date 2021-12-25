const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Category.controller');

// all
router.get('/', controller.getAllCategory);

// teacher only
router.post('/', controller.addCategory);

// all
router.get('/:cid', controller.getCategory);

// all
router.put('/:cid', controller.updateCategory);

// no one
router.delete('/:cid', controller.deleteCategory);

module.exports = router;
