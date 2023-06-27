const userService = require('./userService');

class UserController {
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