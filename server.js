/**
 * @author : MustafaBiçer
 * @since : 2018
 */
var express = require('express')
var app = express();
var path = require('path')
const nodemailer = require('nodemailer');

var response = "";
app.get('/api/sendMail', function (req, res) {
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: req.query.from, // generated ethereal user
        pass: req.query.pass // generated ethereal password
      }
    });
    // setup email data with unicode symbols
    var mailOptions = {
      from: req.query.from, // sender address
      to: req.query.to, // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  });

});
app.listen(3000, function () {
  console.log('Example app listening on port 2016!');
});