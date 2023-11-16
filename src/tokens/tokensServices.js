const jwt = require("jsonwebtoken");

class TokensServices {
  createAccessToken(id, roles) {
    return jwt.sign({id, roles}, process.env.ACCESS_SECRET, {expiresIn: '1h'});
  }

  createRefreshToken(id, roles) {
    return jwt.sign({id, roles}, process.env.REFRESH_SECRET, {expiresIn: '24h'});
  }
}

module.exports = new TokensServices();