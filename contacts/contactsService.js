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

    async updateContact(id, contact) {
        try {
            const updatedContact = await Contacts.updateOne({_id: id}, contact);
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