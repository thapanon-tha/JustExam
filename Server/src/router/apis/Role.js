const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Role.controller');

// all
router.get('/', controller.getRole);

router.post('/', controller.addRole);

router.put('/:rid', controller.updateRole);

router.delete('/:rid', controller.deleteRole);

module.exports = router;
