const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/Channel.controller');
router.use('/:id/members', require('./Member'));

// all user
router.get('/', controller.channelsGET);

// teacher only
router.post('/', controller.delete_channel);

// owner(teacher) & member(student) only
router.get('/:id', controller.get_channel);

// owner(teacher) only
router.put('/:id', controller.post_channel);

// owner(teacher) only
router.delete('/:id', controller.put_channel);

module.exports = router;
