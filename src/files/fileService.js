const path = require("path");
const {staticPath} = require("../../paths");
const cloudinary = require("cloudinary");
const fs = require("fs");
const {File} = require("../schemas/schemas");
const {upload, destroy} = cloudinary.v2.uploader;

class FileService {
  async saveFile(file, fileName, format) {
    try {
      if (fileName === 'CV') {
        const filePath = path.resolve(staticPath, `${fileName}.${format}`);
        await file.mv(filePath, (err) => {
          if (err) throw(err);
        })

        return {name: fileName, url: filePath}
      }
      const isFileInCloud = await File.findOne({name: fileName});
      console.log('isFileInCloud',isFileInCloud)
      if (isFileInCloud) await this.deleteFile(fileName);
      const filePath = path.resolve(staticPath, `${fileName}.${format}`);
      console.log('filePath',filePath)
      await file.mv(filePath);
      const savedInCloudFile = await upload(filePath, {
        folder: 'portfolio',
        public_id: fileName,
        format: format,
        unique_filename: true
      });
      console.log('savedInCloudFile',savedInCloudFile)
      await fs.rm(filePath, (err) => {
        if (err) console.log(err);
      });
      return await File.create({name: fileName, url: savedInCloudFile.url});
    } catch (e) {
      throw e;
    }
  }

  async deleteFile(imageName) {
    try {
      await destroy(`portfolio/${imageName}`);
      const deletedImage = await File.deleteOne({name: imageName});
      return deletedImage;
    } catch (e) {
      throw e;
    }
  }

  async getFile(fileName) {
    const file = await File.findOne({name: fileName});
    if (!file) return {message: 'File not found!'};
    return file;
  }
}

module.exports = new FileService();