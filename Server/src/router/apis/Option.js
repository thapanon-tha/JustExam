const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Option.controller');

//* create middleware only Owner of Channel can use this API

// all
router.get('/', controller.getOption);

// teacher only
router.post('/', controller.addOption);

// all
router.put('/', controller.updateOption);

// no one
router.delete('/:oid', controller.deleteOption);

module.exports = router;
