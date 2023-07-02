const transporterService = require('./transporterService');

class TransporterController {
    async sendMessage(req, res, next) {
        try {
            const result = await transporterService.sendMessage(req.body);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json({message: e.message});
        }
    }
}

module.exports = new TransporterController();