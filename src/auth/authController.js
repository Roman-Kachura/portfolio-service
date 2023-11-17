const authService = require('./authService');
const {validationResult} = require("express-validator");

class AuthController {
  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const data = await authService.login(email, password);
      console.log('data',data)
      return res.status(200).json(data);
    } catch (e) {
      console.log(e)
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

  async logout(req, res, next) {
    try {
      const id = req.params.id;
      const response = await authService.logout(id);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({message: e});
    }
  }

  async refresh(req, res, next) {
    try {
      const refresh_token = req.body.refresh_token;
      const response = await authService.refresh(refresh_token);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json({message: e});
    }
  }
}

module.exports = new AuthController();