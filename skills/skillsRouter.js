const express = require('express');
const router = express.Router();
const skillsController = require('./skillsController');

router.use((req, res, next) => {
    next();
});

router.get('/', skillsController.getAllSkills);
router.post('/', skillsController.createSkill);
router.put('/:id', skillsController.updateSkill);
router.delete('/:id', skillsController.deleteSkill);

module.exports = router;