const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/QuestionExamChannel.controller');

// all if share || owner (teacher)
router.get('/', controller.getQuestion);
// owner (teacher)
router.post('/', controller.addQuestion);
// owner (teacher)
router.put('/', controller.updateQueation);

module.exports = router;
