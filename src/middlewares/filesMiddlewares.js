class FilesMiddlewares {
    imageMiddleware(req, res, next) {
        if (req.method === 'OPTIONS') next();
        try {
            if(!req.files) return res.status(400).json({message: 'There are not any files!'});
            const image = req.files.image;
            if (!image) return res.status(400).json({message: 'Image is not found!'});
            if (image.mimetype.slice(0, 5) !== 'image') return res.status(400).json({message: 'File extension can only be image format'});
            next();
        } catch (e) {
            return res.status(400).json({message: e.message});
        }

    }

    pdfMiddleware(req, res, next) {
        if (req.method === 'OPTIONS') next();
        try {
            if(!req.files) return res.status(400).json({message: 'There are not any files!'});
            const file = req.files.file;
            if (!file) return res.status(400).json({message: 'File is not found!'});
            if (file.mimetype !== 'application/pdf') return res.status(400).json({message: 'File extension can only be pdf!'});
            next();
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
}

module.exports = new FilesMiddlewares();