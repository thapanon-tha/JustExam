const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Question.controller');

// all if share || owner (teacher)
router.get('/', controller.getQuestion);
// owner (teacher)
router.post('/', controller.addQuestion);
// owner (teacher)
router.put('/', controller.updateQueations);
router.put('/:qid', controller.updateQueation);
// owner (teacher)
router.delete('/:qid', controller.deleteQuestion);

module.exports = router;
