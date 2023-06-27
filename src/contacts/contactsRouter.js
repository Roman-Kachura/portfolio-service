const express = require('express');
const router = express.Router();
const contactsController = require('./contactsController');

router.use((req, res, next) => {
    next();
});

router.post('/', contactsController.createContact);
router.get('/', contactsController.getAllContacts);
router.put('/:id', contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;