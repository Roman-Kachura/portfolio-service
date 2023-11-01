const {Projects} = require("../schemas/schemas");
const fileService = require("../files/fileService");
const {log} = require("util");

const checkUrls = (url) => {
  const reg1 = url.slice(0, 7) === 'http://';
  const reg2 = url.slice(0, 8) === 'https://';
  return reg1 | reg2;
}

class ProjectsService {
  async createProject(data) {

    try {
      const {name, image, url, github} = data;
      const isProjectInDB = await Projects.findOne({name});
      if (isProjectInDB) throw {message: 'Project with such a name is already in database!'};
      if (!checkUrls(url)) {
        throw {message: 'Url is not correct!'};
      }
      if (!checkUrls(github)) throw {message: 'Github link is not correct!'};
      if (name.length === 0) throw {message: 'Name can not be empty!'};
      const savedImage = await fileService.saveFile(image, name, 'png');
      const createdProject = await Projects.create({
        name,
        url,
        github,
        picture: {name: savedImage.name, url: savedImage.url}
      });
      return createdProject;
    } catch (e) {
      throw e;
    }
  }

  async getAllProjects() {
    const projects = await Projects.find({});
    return projects.reverse();
  }

  async updateProject(_id, data) {
    const {name, github, url, image} = data;
    const isProjectInDB = await Projects.findOne({_id});
    if (!isProjectInDB) throw {message: 'There is not a project with this id in DataBase!'};
    if (!checkUrls(url)) throw {message: 'Url is not correct!'};
    if (!checkUrls(github)) throw {message: 'Github link is not correct!'};
    const savedImage = await fileService.saveFile(image, name, 'png');
    const updatedProject = await Projects.updateOne({_id}, {
      name,
      github,
      url,
      picture: {name: savedImage.name, url: savedImage.url}
    });
    return updatedProject;
  }

  async deleteProject(_id) {
    const projectInDB = await Projects.findOne({_id});
    if (!projectInDB) throw {message: 'There is not a project with this id in DataBase!'};
    await fileService.deleteFile(projectInDB.picture.name);
    const deletedProject = await Projects.deleteOne({_id});
    return deletedProject;
  }
}

module.exports = new ProjectsService();