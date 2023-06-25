const {Schema, model} = require("mongoose");

const RoleSchema = new Schema({
    value: {type: String, unique: true, default: 'USER'}
});
const Role = model('role', RoleSchema);

const UserSchema = new Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    roles: [{type: String, ref: 'roles'}]
});
const Users = model('users', UserSchema);

const SkillSchema = new Schema({
    title: {type: String, require: true},
    picture: {type: String, require: true},
});
const Skills = model('skills', SkillSchema);

const ContactSchema = new Schema({
    name: {type: String, unique: true, require: true},
    icon: {type: String, require: false},
    href: {type: String, require: true}
});
const Contacts = model('contacts', ContactSchema);


exports.Users = Users;
exports.Skills = Skills;
exports.Contacts = Contacts;
exports.Role = Role;