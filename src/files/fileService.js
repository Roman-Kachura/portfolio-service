const path = require("path");
const fs = require("fs");
const {staticPath} = require("../paths");

class FileService {
    async saveFile(file, fileName) {
        try {
            const filePath = path.resolve(staticPath, fileName);
            await file.mv(filePath)
            return filePath;
        } catch (e) {
            throw e;
        }
    }

    async saveImage(image, imageName) {
        try {
            const imagePath = path.resolve(staticPath, 'images', imageName);
            await image.mv(imagePath)
            return imagePath;
        } catch (e) {
            throw e;
        }
    }

    async deleteImage(imageName){
        try {
            const imagePath = path.resolve(staticPath, 'images', imageName);
            fs.unlink(imagePath,(err)=>{
                if(err) throw err;
                return 'The image has been deleted!'
            })
        }catch (e) {
            throw e;
        }
    }
}

module.exports = new FileService();