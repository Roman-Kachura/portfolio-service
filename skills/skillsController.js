const skillsService = require('./skillsService');

class SkillsController {
    async getAllSkills(req, res, next) {
        try {
            const skills = await skillsService.getAllSkills();
            res.json(skills).status(200);
        } catch (e) {
            throw e;
        }
    }

    async createSkill(req, res, next) {
        try {
            const file = req.files.file;
            if(file.mimetype.slice(0,5) !== 'image'){
                res.status(400).json({message:'Photo extension can only be image format'});
            }
            const {title} = req.body;
            const createdSkill = await skillsService.createSkill(title, file);
            res.json(createdSkill).status(200);
        } catch (e) {
            throw e;
        }
    }

    async updateSkill(req, res, next) {
        try {
            const {title, picture} = req.body;
            const id = req.params.id;
            const skill = {id, title, picture};
            const file = req.files.file;
            if(file.mimetype.slice(0,5) !== 'image'){
                res.status(400).json({message:'Photo extension can only be image format'});
            }
            const updatedSkill = await skillsService.updateSkill(skill, file);
            res.json(updatedSkill).status(200);
        } catch (e) {
            throw e;
        }
    }

    async deleteSkill(req, res, next) {
        try {
            const id = req.params.id;
            const deletedSkill = await skillsService.deleteSkill(id);
            res.json(deletedSkill).status(200);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new SkillsController();