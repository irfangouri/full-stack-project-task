const nodemailer = require('nodemailer');

const {
  MAIL_USER,
  MAIL_PASS,
} = require('../config/config');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

const sendMail = async () => {
  try {
    const mailOptions = {
      from: 'Irfan Gouri <irfan.gouri.9983@gmail.com>',
      to: 'Irfan <humantemp1@gmail.com>',
      subject: 'Signup in Todo Application',
      text: 'Hello world, Welcome to my Todo application',
    };
  
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.log('Error occurred while sending mail, Error: ', error);
  }
}

module.exports = sendMail;
