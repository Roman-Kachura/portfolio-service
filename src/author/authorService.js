const {Authors} = require('../schemas/schemas');
const authorDto = require('./author.dto');

class AuthorService {
  async createAuthor(user) {
    try {
      const author = await Authors.create({...user});
      return authorDto(author);
    } catch (e) {
      throw e;
    }
  }

  async getAuthor() {
    try {
      const authors = await Authors.find({});
      return authors.length ? authorDto(authors[0]) : null;
    } catch (e) {
      throw e;
    }
  }

  async updateAuthor(author) {
    const {id, name, email, phone, location} = author;
    try {
      const authorOldData = await Authors.findOne({_id: id})
      if (!authorOldData) throw 'Author is not found';
      const updatedAuthor = await Authors.updateOne({_id: authorOldData._id}, {
        name: name || authorOldData.name,
        email: email || authorOldData.email,
        phone: phone || authorOldData.phone,
        location: {
          name: location.name || authorOldData.location.name,
          url: location.url || authorOldData.location.url
        }
      });
      return updatedAuthor;
    } catch (e) {
      throw e;
    }
  }

  async deleteAuthor(id) {
    try {
      const deletedAuthor = await Authors.deleteOne({_id: id});
      return deletedAuthor;
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new AuthorService();