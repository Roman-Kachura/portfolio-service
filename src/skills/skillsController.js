const skillsService = require('./skillsService');

class SkillsController {
    async getAllSkills(req, res, next) {
        try {
            const skills = await skillsService.getAllSkills();
            return res.json(skills).status(200);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: e.message});
        }
    }

    async createSkill(req, res, next) {
        try {
            const image = req.files.image;
            const {title} = req.body;
            const createdSkill = await skillsService.createSkill(title, image);
            return res.json(createdSkill).status(200);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: e.message});
        }
    }

    async updateSkill(req, res, next) {
        try {
            const {title, picture} = req.body;
            const id = req.params.id;
            const skill = {id, title, picture};
            const image = req.files.image;
            const updatedSkill = await skillsService.updateSkill(skill, image);
            return res.json(updatedSkill).status(200);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: e.message});
        }
    }

    async deleteSkill(req, res, next) {
        try {
            const id = req.params.id;
            const deletedSkill = await skillsService.deleteSkill(id);
            return res.json(deletedSkill).status(200);
        } catch (e) {
            console.log(e);
            return res.status(400).json({message: e.message});
        }
    }
}

module.exports = new SkillsController();