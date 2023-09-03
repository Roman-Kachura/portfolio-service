const express = require('express');
const router = express.Router();
const skillsController = require('./skillsController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const filesMiddlewares = require('../middlewares/filesMiddlewares');


router.use((req, res, next) => {
  next();
});

router.get('/', skillsController.getAllSkills);

router.post('/', [
  authMiddleware,
  roleMiddleware('ADMIN'),
  filesMiddlewares.imageMiddleware
], skillsController.createSkill);

router.put('/:id', [
  authMiddleware,
  roleMiddleware('ADMIN'),
  filesMiddlewares.imageMiddleware
], skillsController.updateSkill);

router.delete('/:id', [
  authMiddleware,
  roleMiddleware('ADMIN')
], skillsController.deleteSkill);

module.exports = router;