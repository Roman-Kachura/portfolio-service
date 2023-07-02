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
const port = process.env.PORT || 5000;

app.use(cors({}));
app.use(express.json());
app.use(express.static('static'));
app.use(express.static('static/images'));
app.use(express.static('public'));
app.use(fileUpload({}));
app.get('/', (req, res) => {
    const pathFile = path.join(__dirname, 'public', 'index.html');
    fs.readFile(pathFile, {encoding: 'utf8'}, (err, file) => {
        return res.status(200).send(file);
    })
});

app.use('/users', userRouter);
app.use('/skills', skillsRouter);
app.use('/contacts', contactsRouter);
app.use('/auth', authRouter);
app.use('/files', filesRouter);
app.use('/author', authorRouter);
app.use('/mail', transporterRouter);

const serverStart = () => {
    try {
        mongoose.connect(`mongodb+srv://romakachyra:bojCMiwtgJWZlzB1@cluster0.vb9ft0m.mongodb.net/portfolio?retryWrites=true&w=majority`);
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (e) {
        console.log(e)
    }
}

serverStart();


