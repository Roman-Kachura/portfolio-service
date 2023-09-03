require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const authRouter = require('./src/auth/authRouter');
const userRouter = require('./src/users/userRouter');
const skillsRouter = require('./src/skills/skillsRouter');
const contactsRouter = require('./src/contacts/contactsRouter');
const filesRouter = require('./src/files/filesRouter');
const authorRouter = require('./src/author/authorRouter');
const transporterRouter = require('./src/transporter/transporterRouter');
const projectsRouter = require('./src/projects/projectsRouter');
const cloudinary = require("cloudinary");
const port = process.env.PORT || 5000;

app.use(cors({
  origin: '*'
}));
app.use(express.json());
app.use(express.static('static'));
app.use(express.static('static/images'));
app.use(express.static('public'));
app.use(fileUpload({}));
app.get('/', (req, res) => {
  return res.json({message: 'Server works correctly!'}).status(200);
});

app.use('/users', userRouter);
app.use('/skills', skillsRouter);
app.use('/contacts', contactsRouter);
app.use('/auth', authRouter);
app.use('/files', filesRouter);
app.use('/author', authorRouter);
app.use('/email', transporterRouter);
app.use('/projects', projectsRouter);

const serverStart = () => {
  try {
    cloudinary.config({
      cloud_name: 'dp8gsdfks',
      api_key: '137623215113561',
      api_secret: 'V7MukkUNCu3NGbUe9k5aDVCWkSI'
    });
    mongoose.connect(`mongodb+srv://romakachyra:bojCMiwtgJWZlzB1@cluster0.vb9ft0m.mongodb.net/portfolio?retryWrites=true&w=majority`);
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (e) {
    console.log(e.message)
  }
}

serverStart();


