const express = require('express');
const router = express.Router();
const contactsController = require('./contactsController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.use((req, res, next) => {
  next();
});

router.post('/', [authMiddleware, roleMiddleware('ADMIN')], contactsController.createContact);
router.get('/', contactsController.getAllContacts);
router.put('/:id', [authMiddleware, roleMiddleware('ADMIN')],contactsController.updateContact);
router.delete('/:id', [authMiddleware, roleMiddleware('ADMIN')],contactsController.deleteContact);

module.exports = router;