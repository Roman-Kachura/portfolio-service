const authorService = require('./authorService');

class AuthorController {
    async createAuthor(req, res, next) {
        try {
            const author = await authorService.getAuthor();
            if (!author) {
                const {name, email, phone, location} = req.body;
                const createdAuthor = await authorService.createAuthor({name, email, phone, location});
                return res.status(200).json(createdAuthor);
            }
            return res.status(400).json({message: 'The author is already in the database'});
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async getAuthor(req, res, next) {
        try {
            const author = await authorService.getAuthor();
            return !author
                ? res.status(400).json({message: 'There is not any authors!'})
                : res.status(200).json(author);
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async updateAuthor(req, res, next) {
        try {
            const updatedAuthor = await authorService.updateAuthor(req.body);
            return res.status(200).json(updatedAuthor);
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }

    async deleteAuthor(req, res, next) {
        try {
            const deletedAuthor = await authorService.deleteAuthor(req.params.id);
            return res.status(200).json(deletedAuthor);
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
}

module.exports = new AuthorController();