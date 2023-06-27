const fileService = require('../files/fileService');
const {Skills} = require("../schemas/schemas");

class SkillsService {
    async getAllSkills() {
        return Skills.find({});
    }

    async createSkill(title, image) {
        const imageName = `${title}.jpg`;
        await fileService.saveImage(image, imageName);
        return Skills.create({title, picture: imageName});
    }

    async updateSkill(skill, image) {
        const {id, title, picture} = skill;
        const imageName = `${title}.jpg`;
        await fileService.deleteImage(picture);
        await fileService.saveImage(image, imageName);
        return Skills.updateOne({_id: id}, {title, picture: imageName});
    }

    async deleteSkill(id) {
        return Skills.deleteOne({_id: id});
    }
}

module.exports = new SkillsService();