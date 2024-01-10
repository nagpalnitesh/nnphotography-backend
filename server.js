// server.js
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Enable CORS to allow requests from your React app (replace 'http://localhost:3000' with your React app's URL if needed).
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: API to upload, get, delete images
// payload -> image_id, image, source (gallery, homepage, header, background)

// Configure your email service.
const transporter = nodemailer.createTransport({
  host: `${process.env.HOST}`, // e.g., 'Gmail', 'Outlook'
  port: process.env.MAIL_PORT,
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSWORD}`,
  },
});

transporter.verify().then(console.log).catch(console.error);

// Handle form submissions.
app.post("/send-email", (req, res) => {
  const { first_name, last_name, phone, subject, email, message } = req.body;
  // Email details.
  const mailOptions = {
    from: "nnphotography03@gmail.com",
    to: "nagpalnitesh9@gmail.com",
    subject: `${subject}`,
    text: `Name: ${first_name} ${last_name}\nPhone Number: ${phone}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email.
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error sending email" });
    } else {
      console.log("Email sent: " + info.response);
      console.log("MailOptions: ", mailOptions);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    }
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
