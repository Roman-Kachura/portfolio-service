const fileService = require('../files/fileService');
const {Skills} = require("../schemas/schemas");

class SkillsService {
    async getAllSkills() {
        return Skills.find({});
    }

    async createSkill(title, image) {
        const skill = await Skills.findOne({title});
        if (skill) throw {message: 'Skill with such a title is already in database!'};
        const savedImage = await fileService.saveFile(image, title, 'png');
        console.log('savedImage',savedImage)
        return Skills.create({title, picture:savedImage.url});
    }

    async updateSkill(skill, image) {
        const {id, title, picture} = skill;
        await fileService.deleteFile(picture);
        const newPicture = await fileService.saveFile(image, title,'png');
        return Skills.updateOne({_id: id}, {title, picture: newPicture.url});
    }

    async deleteSkill(id) {
        const skill = await Skills.findOne({_id: id});
        if (!skill) throw {message: 'There are not such a skill in the database!'};
        await fileService.deleteFile(skill.title);
        return Skills.deleteOne({_id: id});
    }
}

module.exports = new SkillsService();