const jwt = require("jsonwebtoken");

class TokensServices {
  async createAccessToken(id, roles) {
    const token = await jwt.sign({id, roles}, process.env.ACCESS_SECRET, {expiresIn: '1h'});
    console.log('access', token)
    return token;
  }

  async createRefreshToken(id, roles) {
    const token = await jwt.sign({id, roles}, process.env.REFRESH_SECRET, {expiresIn: '24h'});
    console.log('refresh', token)
    return token;
  }
}

module.exports = new TokensServices();