const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Category.controller');

// all
router.get('/', controller.getAllCategory);

// teacher only
router.post('/', controller.addCategory);

// all
router.get('/:ctid', controller.getCategory);

// all
router.put('/:ctid', controller.updateCategory);

// no one
router.delete('/:ctid', controller.deleteCategory);

module.exports = router;
