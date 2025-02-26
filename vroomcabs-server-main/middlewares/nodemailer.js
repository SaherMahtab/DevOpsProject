const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use `true` for port 465, `false` for other ports
  auth: {
    user: 'c74369299@gmail.com',
    pass: 'wgdy ojcq gmwz cbze',
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendMailNodeMailer(subject, text, html) {
  const mailOptions = {
    from: '"Aadarsh Verma👻" <c74369299@gmail.com>', // sender address
    to: 'gamerx9547@gmail.com, aadarsh24lv@gmail.com, jaimalhotra0011@gmail.com', // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
}

console.log('sendMailNodeMailer function is defined:', typeof sendMailNodeMailer);

module.exports = sendMailNodeMailer;
