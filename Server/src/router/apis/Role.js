const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Role.controller');

// all
router.get('/', controller.getRole);

// teacher only
router.post('/', controller.addRole);

// all
router.put('/:rid', controller.updateRole);

// no one
router.delete('/:rid', controller.deleteRole);

module.exports = router;
