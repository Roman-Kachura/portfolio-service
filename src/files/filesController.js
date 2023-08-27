const filesService = require("./fileService");
const path = require("path");
const fs = require("fs");

class FilesController {
  async uploadPhoto(req, res, next) {
    try {
      const image = req.files.image;
      const imageName = 'author';
      const format = 'jpg';
      const savedImage = await filesService.saveFile(image, imageName, format);
      return res.status(200).json(savedImage);
    } catch (e) {
      return res.status(400).json({message: e});
    }
  }

  async uploadCV(req, res, next) {
    try {
      const file = req.files.file;
      const fileName = 'CV';
      const format = 'pdf';
      const savedFile = await filesService.saveFile(file, fileName, format);
      return res.status(200).json(savedFile);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  async uploadHeaderPhoto(req, res, next) {
    try {
      const image = req.files.image;
      const imageName = 'header';
      const format = 'jpg';
      const savedImage = await filesService.saveFile(image, imageName, format);
      return res.status(200).json(savedImage);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  async getPhoto(req, res, next) {
    try {
      const photo = await filesService.getFile('author');
      return res.status(200).json(photo);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  async getCV(req, res, next) {
    try {
      const filePath = path.resolve('public', 'static', 'media', 'CV.pdf');
      return res.status(200).sendFile(filePath);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  async getHeaderPhoto(req, res, next) {
    try {
      const photo = await filesService.getFile('header');
      return res.status(200).json(photo);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }
}

module.exports = new FilesController();