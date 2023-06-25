const {Router} = require('express');
const router = Router();
const userController = require('./userController');
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use((req, res, next) => {
    next();
});

router.get('/', [authMiddleware, roleMiddleware('USER')], userController.getUsers);
router.post('/upload/photo', userController.uploadPhoto);
router.post('/upload/cv', userController.uploadCV);
router.post('/upload/header', userController.uploadHeaderPhoto);


module.exports = router;