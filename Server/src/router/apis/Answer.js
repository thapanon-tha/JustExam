const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Answer.controller');

router.get('/', controller.getAnswer);

router.put('/', controller.updateAnswer);

router.delete('/:aqsid', controller.deleteAnswer);

module.exports = router;
