const {Router} = require('express');
const transporterController = require('./transporterController');
const router = Router();

router.use((req, res, next) => {
    next();
});

router.post('/', transporterController.sendMessage);

module.exports = router;