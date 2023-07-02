const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMPT_LOGIN,
        pass: process.env.SMPT_PASSWORD,
    },
});

exports.transporter = transporter;