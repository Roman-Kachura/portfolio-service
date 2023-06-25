require('dotenv').config();
const path = require('path');
const fileUpload = require('express-fileupload');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const authRouter = require('./auth/authRouter');
const userRouter = require('./user/userRouter');
const skillsRouter = require('./skills/skillsRouter');
const contactsRouter = require('./contacts/contactsRouter');
const port = process.env.PORT || 5000;

mongoose.connect(`mongodb+srv://romakachyra:bojCMiwtgJWZlzB1@cluster0.vb9ft0m.mongodb.net/portfolio?retryWrites=true&w=majority`)

app.use(cors({}));

app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.get('/', (req, res) => {
    res.send({message: 'Portfolio platform server works correct!'}).status(200)
});

app.use('/users', userRouter);
app.use('/skills', skillsRouter);
app.use('/contacts', contactsRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
