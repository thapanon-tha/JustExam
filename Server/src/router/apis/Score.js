const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Score.controller');

// owner (teacher) || member (TA) || member(student only self)
router.get('/', controller.getScore);

// owner (teacher) || member (TA)
router.post('/', controller.addScore);

// owner (teacher) || member (TA)
router.put('/', controller.updateScore);

// all member
router.get('/summary', controller.getSummary);

module.exports = router;
