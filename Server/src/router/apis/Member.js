const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Member.controller');

// owner (teacher) || member (student)
router.get('/', controller.getMember);

// owner (teacher)
router.put('/:id', controller.updateMember);

// owner (teacher) || self (student)
router.delete('/:id', controller.deleteMember);

module.exports = router;
