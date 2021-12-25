const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Score.controller');

// owner (teacher) || member (TA) || member(student only self)
router.get('/table', controller.getTable);

// owner (teacher) || member (TA)
router.post('/summary', controller.getSummary);

module.exports = router;
