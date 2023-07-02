const {Users, Role} = require("../schemas/schemas");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userDto = require('../users/user.dto');

const createAccessToken = (id, roles) => jwt.sign({id, roles}, process.env.SECRET, {expiresIn: '24h'})

class AuthService {
    async login(email, password) {
        try {
            const foundUser = await Users.findOne({email});
            if (!foundUser) return {message: 'User with this email is not found!'};
            const isValidation = await bcrypt.compareSync(password, foundUser.password);
            if (!isValidation) return {message: 'Email or password is not correct!'};
            const user = userDto.getUser(foundUser);
            const accessToken = createAccessToken(foundUser._id, foundUser.roles);
            return {user, accessToken};
        } catch (e) {
            throw e;
        }
    }

    async registration(email, password) {
        try {
            const candidate = await Users.findOne({email});
            if (candidate) return {message: 'User with this email has already registered!'};
            const hashPassword = await bcrypt.hashSync(password, 10);
            const userRole = await Role.findOne({value: 'USER'});
            const createdUser = await Users.create({email, password: hashPassword, roles: [userRole.value]});
            const user = userDto.getUser(createdUser);
            const accessToken = createAccessToken(createdUser._id, createdUser.roles);
            return {user, accessToken};
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new AuthService();