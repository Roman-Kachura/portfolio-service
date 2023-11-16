const {Users, Role} = require("../schemas/schemas");
const bcrypt = require("bcrypt");
const userDto = require('../users/user.dto');
const tokensServices = require('../tokens/tokensServices');
const jwt = require("jsonwebtoken");

class AuthService {
  async login(email, password) {
    try {
      const foundUser = await Users.findOne({email});
      if (!foundUser) throw 'User with this email is not found!';
      const isValidation = await bcrypt.compareSync(password, foundUser.password);
      if (!isValidation) throw 'Email or password is not correct!';
      const accessToken = tokensServices.createAccessToken(foundUser._id, foundUser.roles);
      const refreshToken = tokensServices.createRefreshToken(foundUser._id, foundUser.roles);
      await Users.updateOne({_id: foundUser._id}, {access_token: accessToken, refresh_token: refreshToken})
      const user = userDto.getUser(foundUser);
      return {user, tokens: {access_token: accessToken, refresh_token: refreshToken}};
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

  async logout(_id) {
    try {
      const foundUser = await Users.findOne({_id});
      if (!foundUser) throw 'User with this email is not found!';
      await Users.updateOne({_id}, {access_token: ''})
      return {}
    } catch (e) {
      throw e;
    }
  }

  async refresh(refresh_token) {
    if (!refresh_token) throw {message: 'Refresh token is not found!'};
    if (refresh_token.length === 0) throw {message: 'Refresh token is not found!'};
    const decodedData = jwt.verify(refresh_token, process.env.REFRESH_SECRET);
    const user = await Users.findOne({_id: decodedData.id, refresh_token});
    if (!user) throw {message: 'User is not found!'};
    const accessToken = tokensServices.createAccessToken(decodedData.id, decodedData.roles);
    const refreshToken = tokensServices.createRefreshToken(decodedData.id, decodedData.roles);
    await Users.updateOne({_id: decodedData.id}, {
      access_token: accessToken,
      refresh_token: refreshToken
    });
    const userData = userDto.getUser(user);
    return {user:userData, tokens: {access_token: accessToken, refresh_token: refreshToken}};
  }
}

module.exports = new AuthService();