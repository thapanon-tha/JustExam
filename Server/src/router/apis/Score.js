const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Score.controller');

// owner (teacher) || member (TA) || member(student only self)
router.get('/', controller.getTaskMenu);

// owner (teacher) || member (TA)
router.post('/', controller.update);

// owner (teacher) || member (TA)
router.put('/', controller.update);

// all member
router.get('/summary', controller.post);

module.exports = router;
