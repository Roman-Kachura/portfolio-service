const {Contacts} = require("../schemas/schemas");


class ContactsService {
  async createContact(contact) {
    try {
      const createdContact = await Contacts.create(contact);
      return createdContact;
    } catch (e) {
      throw e;
    }
  }

  async getAllContacts() {
    try {
      const contacts = await Contacts.find({});
      return contacts;
    } catch (e) {
      throw e;
    }
  }

  async updateContact({_id, href, name}) {
    try {
      const contact = await Contacts.find({_id});
      if(!contact) throw 'User is not found!';
      const updatedContact = await Contacts.updateOne({_id}, {
        href,
        name,
      });
      return updatedContact;
    } catch (e) {
      throw e;
    }
  }

  async deleteContact(id) {
    try {
      const deletedContact = await Contacts.deleteOne({_id: id});
      return deletedContact;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new ContactsService();