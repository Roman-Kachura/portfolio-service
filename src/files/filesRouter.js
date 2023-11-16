const {Router} = require('express');
const filesController = require("./filesController");
const router = Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const filesMiddlewares = require('../middlewares/filesMiddlewares');

router.use((req, res, next) => {
    next();
});

router.post('/upload/image/photo', [
    authMiddleware,
    roleMiddleware('ADMIN'),
    filesMiddlewares.imageMiddleware
], filesController.uploadPhoto);

router.post('/upload/pdf/cv', [
    authMiddleware,
    roleMiddleware('ADMIN'),
    filesMiddlewares.pdfMiddleware
], filesController.uploadCV);

router.post('/upload/image/header', [
    authMiddleware,
    roleMiddleware('ADMIN'),
    filesMiddlewares.imageMiddleware
], filesController.uploadHeaderPhoto);

router.get('/image/photo', filesController.getPhoto);
router.get('/image/header', filesController.getHeaderPhoto);
router.get('/pdf/cv', filesController.getCV);
router.get('/show/cv', filesController.showCVFile);

module.exports = router;