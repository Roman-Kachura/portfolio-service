const fileService = require('../files/fileService');
const {Skills} = require("../schemas/schemas");
const uuid = require('uuid');

class SkillsService {
    async getAllSkills() {
        const skills = await Skills.find({});
        return skills;
    }

    async createSkill(title, file) {
        const fileName = uuid.v4() + '.jpg';
        const savedFile = await fileService.saveFile(file, fileName);
        const createdSkill = await Skills.create({title, picture: savedFile});
        return createdSkill;
    }

    async updateSkill(skill, file) {
        const {id, title, picture} = skill;
        const savedFile = await fileService.saveFile(file, picture);
        const updatedSkill = await Skills.updateOne({_id:id}, {title, picture: savedFile})
        return updatedSkill;
    }

    async deleteSkill(id) {
        const deletedSkill = await Skills.deleteOne({_id:id});
        return deletedSkill;
    }
}

module.exports = new SkillsService();