const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/ExamChannel.controller');
router.use('/:ecid/questions', require('./QuestionExamChannel'));
router.use('/:ecid/sectionTime', require('./SectionTime'));

router.get('/totalPoint', controller.totalPointChannel);

router.get('/', controller.getExamChannel);

router.post('/', controller.addExamChannel);

router.put('/:ecid', controller.updateExamChannel);

router.delete('/:ecid', controller.deleteExamChannel);

module.exports = router;
