const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Exam.controller');
router.use('/:eid/questions', require('./Question'));

// owner (teacher)
router.get('/', controller.getAllExam);

// teacher
router.post('/', controller.addExam);

// all if share || owner (teacher)
router.get('/:eid', controller.getExam);

// owner (teacher)
router.put('/:eid', controller.updateExam);

// owner (teacher)
router.delete('/:eid', controller.deleteExam);

module.exports = router;
