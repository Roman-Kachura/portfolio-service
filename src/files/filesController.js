const filesService = require("./fileService");
const path = require("path");

class FilesController {
    async uploadPhoto(req, res, next) {
        try {
            const image = req.files.image;
            const imageName = 'author.jpg';
            await filesService.saveImage(image, imageName);
            return res.status(200).json(imageName);
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e});
        }
    }

    async uploadCV(req, res, next) {
        try {
            const file = req.files.file;
            const fileName = 'CV.pdf';
            await filesService.saveFile(file, fileName);
            return res.status(200).json(fileName);
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: e.message});
        }
    }

    async uploadHeaderPhoto(req, res, next) {
        try {
            const image = req.files.image;
            const imageName = 'header_photo.jpg';
            await filesService.saveImage(image, imageName);
            return res.status(200).json(imageName);
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
}

module.exports = new FilesController();