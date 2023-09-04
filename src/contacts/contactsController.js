const contactsService = require('./contactsService');

class ContactsController {
  async createContact(req, res, next) {
    const {name, icon, href} = req.body;
    try {
      const createdContact = await contactsService.createContact({name, icon, href});
      return res.json(createdContact).status(200);
    } catch (e) {
      throw e;
    }
  }

  async getAllContacts(req, res, next) {
    try {
      const contacts = await contactsService.getAllContacts();
      return res.json(contacts).status(200);
    } catch (e) {
      throw e;
    }
  }

  async updateContact(req, res, next) {
    try {
      const data = {id: req.params.id, ...req.body};
      const updatedContact = await contactsService.updateContact(data);
      return res.json(updatedContact).status(200);
    } catch (e) {
      throw e;
    }
  }

  async deleteContact(req, res, next) {
    try {
      const id = req.params.id;
      const deletedContact = await contactsService.deleteContact(id);
      return res.json(deletedContact).status(200);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new ContactsController();