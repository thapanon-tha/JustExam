const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/QuestionType.controller');

router.get('/', controller.getQuestionType);

router.post('/', controller.addQuestionType);

router.put('/:qtid', controller.updateQuestionType);

router.delete('/:qtid', controller.deleteQuestionType);

module.exports = router;
