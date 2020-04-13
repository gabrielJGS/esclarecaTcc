const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "appesclareca@gmail.com",
        pass: "esclareca2020"
    }
  });

module.exports = transporter