const {Router} = require('express');
const authorController = require('./authorController');
const router = Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use((req, res, next) => next());

router.get('/', authorController.getAuthor);

router.post('/', [authMiddleware, roleMiddleware('ADMIN')], authorController.createAuthor);

router.put('/:id', [authMiddleware, roleMiddleware('ADMIN')], authorController.updateAuthor);

router.delete('/:id', [authMiddleware, roleMiddleware('ADMIN')], authorController.deleteAuthor);

module.exports = router;