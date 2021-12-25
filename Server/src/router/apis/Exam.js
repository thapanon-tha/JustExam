const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Exam.controller');
router.use('/:id/questions', require('./Question'));

// owner (teacher)
router.get('/', controller.getAllExam);

// teacher
router.post('/', controller.addExam);

// all if share || owner (teacher)
router.get('/:id', controller.getExam);

// owner (teacher)
router.put('/:id', controller.updateExam);

// owner (teacher)
router.delete('/:id', controller.deleteExam);

module.exports = router;
