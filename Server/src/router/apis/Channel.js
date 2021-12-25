const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Channel.controller');
router.use('/:id/members', require('./Member'));

// all user
router.get('/', controller.getChannel);

// teacher only
router.post('/', controller.addChannel);

// owner(teacher) & member(student) only
router.get('/:id', controller.getChannelById);

// owner(teacher) only
router.put('/:id', controller.updateChannel);

// owner(teacher) only
router.delete('/:id', controller.deleteChannel);

module.exports = router;
