const userService = require('./userService');

class UserController {
    async uploadPhoto(req, res, next) {
        try {
            const photo = req.files.photo;
            if(photo.mimetype.slice(0,5) !== 'image'){
                res.status(400).json({message:'Photo extension can only be image format'});
            }
            const savedPhoto = await userService.uploadPhoto(photo);
            res.json(savedPhoto).status(200);
        } catch (e) {
            throw e;
        }
    }

    async uploadCV(req, res, next) {
        try {
            const file = req.files.file;
            if(file.mimetype !== 'application/pdf'){
                res.status(400).json({message:'File extension can only be pdf!'});
            }
            const savedPhoto = await userService.uploadCV(file);
            res.json(savedPhoto).status(200);
        } catch (e) {
            throw e;
        }
    }

    async uploadHeaderPhoto(req, res, next) {
        try {
            const photo = req.files.photo;
            if(photo.mimetype.slice(0,5) !== 'image'){
                res.status(400).json({message:'Photo extension can only be image format'});
            }
            const savedPhoto = await userService.uploadHeaderPhoto(photo);
            res.json(savedPhoto).status(200);
        } catch (e) {
            throw e;
        }
    }

    async getUsers(req, res, next) {
        try {
            const response = await userService.getUsers();
            return res.json(response).status(200);
        } catch (e) {
            console.log(e);
            return res.json({message: e}).status(400);
        }
    }
}

module.exports = new UserController();