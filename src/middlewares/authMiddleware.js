const jwt = require('jsonwebtoken');
const {Users} = require("../schemas/schemas");

module.exports = async function (req, res, next) {
  if (req.method === 'OPTIONS') next();

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({message: 'User is not authorized!'});
    if(token.length === 0) return res.status(401).json({message: 'User is not authorized!'});
    const decodedData = jwt.verify(token, process.env.SECRET);
    const user = await Users.findOne({_id: decodedData.id, access_token: token});
    if (!user) return res.status(401).json({message: 'User is not authorized!'});
    req.user = decodedData;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({message: 'User is not authorized!'});
  }
}