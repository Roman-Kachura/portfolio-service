const {Users} = require("../schemas/schemas");

class UserService {
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