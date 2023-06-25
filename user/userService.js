const fileService = require('../files/fileService');
const {Users} = require("../schemas/schemas");

class UserService {
    async uploadPhoto(photo) {
        const fileName = 'author.jpg';
        const savedPhoto = await fileService.saveFile(photo, fileName);
        return savedPhoto;
    }

    async uploadCV(file) {
        const fileName = 'CV.pdf';
        const savedCV = await fileService.saveFile(file, fileName);
        return savedCV;
    }

    async uploadHeaderPhoto(photo) {
        const fileName = 'header_photo.jpg';
        const savedPhoto = await fileService.saveFile(photo, fileName);
        return savedPhoto;
    }

    async getUsers() {
        try {
            const users = Users.find({});
            return users;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new UserService();