const {Router} = require('express');
const projectController = require('./projectsController');
const filesMiddlewares = require("../middlewares/filesMiddlewares");
const router = Router();

router.use((req, res, next) => {
  next();
});

router.post('/', [
  // authMiddleware,
  // roleMiddleware('ADMIN'),
  filesMiddlewares.imageMiddleware
], projectController.createProject);
router.get('/', projectController.getAllProjects);
router.put('/:id', [
  // authMiddleware,
  // roleMiddleware('ADMIN'),
  filesMiddlewares.imageMiddleware
], projectController.updateProject);
router.delete('/:id', [
  // authMiddleware,
  // roleMiddleware('ADMIN'),
], projectController.deleteProject);

module.exports = router;