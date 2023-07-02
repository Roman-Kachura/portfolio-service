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
        try {
            const authorOldData = await Authors.findOne({_id: author.id});
            const authorNewData = {
                name: author.name || authorOldData.name,
                email: author.email || authorOldData.email,
                phone: author.phone || authorOldData.phone,
                location: {
                    name: author.location && author.location.name || authorOldData.location.name,
                    url: author.location && author.location.url || authorOldData.location.url
                }
            }
            const updatedAuthor = await Authors.updateOne({_id: author.id}, authorNewData);
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