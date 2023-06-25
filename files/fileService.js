const path = require('path');

class FileService {
    async saveFile(file,fileName) {
        try {
            const filePath = path.resolve('static', fileName);
            await file.mv(filePath)
            return fileName;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new FileService();