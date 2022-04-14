const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Member.controller');

//* create middleware only Owner of Channel can use this API

// owner (teacher) || member (student)
router.get('/', controller.getMember);

// student join
router.post('/', controller.addMember);

// getmember answer
router.get('/:mid', controller.getMemberAnswer);

// owner (teacher)
router.put('/:mid', controller.updateMember);

// owner (teacher) || self (student)
router.delete('/:mid', controller.deleteMember);

module.exports = router;
