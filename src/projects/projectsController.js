const projectsService = require('./projectsService');

class ProjectsController {
  async createProject(req, res, next) {
    try {
      const data = {...req.body, image: req.files.image};
      const createdProject = await projectsService.createProject(data);
      return res.status(200).json(createdProject);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  async getAllProjects(req, res, next) {
    try {
      const projects = await projectsService.getAllProjects();
      return res.status(200).json(projects);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  async updateProject(req, res, next) {
    try {
      const {id} = req.params;
      const data = {...req.body, image: req.files.image};
      const updatedProject = await projectsService.updateProject(id, data);
      return res.status(200).json(updatedProject);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }

  async deleteProject(req, res, next) {
    try {
      const {id} = req.params;
      const deletedProject = await projectsService.deleteProject(id);
      return res.status(200).json(deletedProject);
    } catch (e) {
      return res.status(400).json({message: e.message});
    }
  }
}

module.exports = new ProjectsController();