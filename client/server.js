// Import
const express = require("express");
const cParser = require("cookie-parser");
const path = require("path");
// const nodemailer = require('nodemailer');

const usersRouter = require("./route/app.route").router;

// Instanciation/Initialize server
const app = express();

// Set to ejs
app.set("view engine", "ejs");

// Static folder
app.use("/public", express.static(path.join(__dirname, "public")));
//Send email with Nodemailer
//app.use('/send/candidature', express.static(path.join(__dirname, 'static')));

// Body parsing via express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cParser());

// App Route
app.use("/", usersRouter);

// Nodemailer
// app.get("/", ((req, res)=> {
//   res.sendFile(path.join(__dirname, "/index.html"))
// }))
// app.post("/send_email", function(req, res) {
//   console.log('fuction send_email');
//   let from = req.body.from;
//   let to = req.body.to;
//   let subject = req.body.subject;
//   let message = req.body.message;
//   console.log(req.body);

//   let transporter = nodemailer.createTransport({
//   service: 'gmail',
//     auth: {
//       user: 'niauxthomas@gmail.com',
//       pass: 'obmdvaassvbaoymb'
//     }
//   });

//   let mailOptions = {
//     from: from,
//     to: to,
//     subject: subject,
//     text: message
//   };

//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email envoyé: ' + info.res);
//       res.redirect("/send/candidature")
//     }
//   });
// });

// Listener
const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Server-front up and running at: http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
    process.exit();
  }
};
start(3000);
