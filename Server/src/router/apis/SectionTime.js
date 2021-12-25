const router = require('express').Router({ mergeParams: true });
const controller = require('../../controllers/SectionTime.controller');

router.get('/', controller.getSectionTime);

router.post('/', controller.addSectionTime);

router.put('/', controller.updateSectionTime);

router.delete('/:setcid', controller.deleteSectionTime);

module.exports = router;
