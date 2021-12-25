const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/ExamChannel.controller');
router.use('/:ecid/questions', require('./QuestionExamChannel'));
router.use('/:ecid/sectionTime', require('./SectionTime'));

router.get('/', controller.getAllExamChannel);

router.post('/', controller.addExamChannel);

router.get('/:ecid', controller.getExamChannel);

router.put('/:ecid', controller.updateExamChannel);

router.delete('/:ecid', controller.deleteExamChannel);

router.get('/totalPoint', controller.totalPointChannel);

module.exports = router;
