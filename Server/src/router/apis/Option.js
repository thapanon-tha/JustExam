const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Option.controller');

// all
router.get('/', controller.getOption);

// teacher only
router.post('/', controller.addOption);

// all
router.put('/:oid', controller.updateOption);

// no one
router.delete('/:oid', controller.deleteOption);

module.exports = router;
