const authService = require('./authService');
const {validationResult} = require("express-validator");

class AuthController {
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const response = await authService.login(email, password);
            return res.status(200).json(response);
        } catch (e) {
            return res.status(400).json({message: e});
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors});
            }
            const {email, password} = req.body;
            const response = await authService.registration(email, password);
            return res.json(response).status(200);
        } catch (e) {
            return res.json({message: e}).status(400);
        }
    }
}

module.exports = new AuthController();