const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const { callbackPromise } = require('nodemailer/lib/shared');
const dotenv = require('dotenv').config({path: '../.env'});

const auth = {
  auth: {
    api_key: process.env.MAIL_API_KEY,
    domain: process.env.MAIL_DOMAIN
  }
}

const transporter = nodemailer.createTransport(mailGun(auth)); 



const sendMail = (sender, recipient, subject, text, callback) => { 
  const mailOptions = {
    from: sender, 
    to: recipient,
    subject: subject,
    text: text
  }

  transporter.sendMail(mailOptions, function(err, data) { 
    if(err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
}

module.exports = sendMail;

