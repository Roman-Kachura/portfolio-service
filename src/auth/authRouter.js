const Router = require('express');
const authController = require("./authController");
const router = Router();
const {check} = require('express-validator');

router.use((req, res, next) => {
  next();
});

router.post('/refresh', authController.refresh);
router.post('/login', authController.login);
router.post('/registration', [
  check('email', 'Email is not correct!').isEmail(),
  check('email', `Email can't be empty!`).notEmpty(),
  check('password', `Password must be from 4 to 20 characters!`).isLength({min: 4, max: 20}),
], authController.registration);
router.delete('/logout/:id',authController.logout);

module.exports = router;