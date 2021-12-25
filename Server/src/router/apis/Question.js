const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Question.controller');

// all if share || owner (teacher)
router.get('/', controller.getTaskMenu);
// owner (teacher)
router.post('/', controller.update);
// owner (teacher)
router.put('/', controller.update);
// owner (teacher)
router.delete('/', controller.post);

module.exports = router;
