const {Schema, model} = require("mongoose");

const RoleSchema = new Schema({
  value: {type: String, unique: true, default: 'USER'}
});
const Role = model('role', RoleSchema);

const UserSchema = new Schema({
  email: {type: String, require: true, unique: true},
  access_token: {type: String, require: true, unique: true},
  refresh_token: {type: String, require: true, unique: true},
  password: {type: String, require: true},
  roles: [{type: String, ref: 'roles'}]
});
const Users = model('users', UserSchema);

const SkillSchema = new Schema({
  title: {type: String, require: true, unique: true},
  picture: {type: String, require: true},
});
const Skills = model('skills', SkillSchema);

const ContactSchema = new Schema({
  name: {type: String, unique: true, require: true},
  icon: {type: String, require: false},
  href: {type: String, require: true}
});
const Contacts = model('contacts', ContactSchema);

const AuthorSchema = new Schema({
  name: {type: String, unique: true, require: true},
  email: {type: String, unique: true, require: true},
  phone: {type: String, unique: true, require: true},
  location: {
    name: {type: String, require: true},
    url: {type: String, require: true}
  },
});
const Authors = model('authors', AuthorSchema);

const FileSchema = new Schema({
  name: {type: String, unique: true, require: true},
  url: {type: String, unique: true, require: true}
});
const File = model('files', FileSchema);

const ProjectSchema = new Schema({
  name: {type: String, unique: true, require: true},
  github: {type: String, unique: true, require: true},
  url: {type: String, unique: true, require: true},
  picture: {
    name: {type: String, unique: true, require: true},
    url: {type: String, unique: true, require: true}
  },
});
const Projects = model('projects', ProjectSchema);


exports.Users = Users;
exports.Skills = Skills;
exports.Contacts = Contacts;
exports.Role = Role;
exports.Authors = Authors;
exports.File = File;
exports.Projects = Projects;