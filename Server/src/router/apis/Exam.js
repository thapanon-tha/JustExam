const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Exam.controller');
router.use('/:id/questions', require('./Question'));

// owner (teacher)
router.get('/', controller.create_new_exam);

// teacher
router.post('/', controller.delete_exam);

// all if share || owner (teacher)
router.get('/:id', controller.get_all_exam);

// owner (teacher)
router.put('/:id', controller.get_exam);

// owner (teacher)
router.delete('/:id', controller.update_exam);

module.exports = router;
