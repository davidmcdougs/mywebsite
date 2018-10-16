// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var nodemailer = require('nodemailer');

// Create an instance of the express app.
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Specify the port.
var port = process.env.PORT || 3000;

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get('/projects/tree', function(req,res){
  res.sendFile(path.join(__dirname, "/projects/tree/index.html"))
});

app.post('/contact/mail', function(req,res){
console.log("i am req.body after mail trigger ", req.body);

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "davidmcdougs@yahoo.com", // generated ethereal user
            pass: "thiswontworkanywhereelse",  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: req.body.email, // sender address
        to: 'davidmcdougs@gmail.com', // list of receivers
        subject: req.body.subject, // Subject line
        text: JSON.stringify(req.body), // plain text body
        // html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    var response = "Still working on this. Please contact me directly at davidl.mcdougald@gmail.com for now.";
    res.json(response);
});
// });





app.use(express.static("views"));
app.listen(port);



