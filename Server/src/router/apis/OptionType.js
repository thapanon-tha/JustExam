const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/OptionType.controller');

router.get('/', controller.getAllOptionType);

router.post('/', controller.addOptionType);

router.get('/:otid', controller.getOptionType);

router.put('/:otid', controller.updateOptionType);

router.delete('/:otid', controller.deleteOptionType);

module.exports = router;
