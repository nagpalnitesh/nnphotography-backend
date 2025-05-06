// server.js
require('dotenv').config();
// const mongoose = require("mongoose");
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Enable CORS to allow requests from your React app (replace 'http://localhost:3000' with your React app's URL if needed).
// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// DB Connection
// mongoose
//   .connect(process.env.DB_HOST, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("DB CONNECTED");
//   })
//   .catch((e) => {
//     console.log("Error", e);
//   });

// My Routes
const authRoutes = require('./routes/auth');
const photoRoutes = require('./routes/photo');
// const userRoutes = require("./routes/user");
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const orderRoutes = require("./routes/order");
// const stripePaymentRoutes = require("./routes/payment");

// app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use(cookieParser());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Routes
app.use('/api', authRoutes);
app.use('/api', photoRoutes);
// app.use("/api", userRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);
// app.use("/api", orderRoutes);
// app.use("/api", stripePaymentRoutes);

// TODO: API to upload, get, delete images
// payload -> image_id, image, source (gallery, homepage, header, background)

app.get('/api/gallery', async (req, res) => {
  const username = process.env.CLOUDINARY_API_KEY;
  const password = process.env.CLOUDINARY_API_SECRET;
  const basicAuth = 'Basic ' + btoa(username + ':' + password);
  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dhk0mr5qh/resources/image/tags/nnphotography-gallery?max_results=100',
      {
        headers: {
          Authorization: basicAuth,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/home', async (req, res) => {
  const username = process.env.CLOUDINARY_API_KEY;
  const password = process.env.CLOUDINARY_API_SECRET;
  const basicAuth = 'Basic ' + btoa(username + ':' + password);
  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dhk0mr5qh/resources/image/tags/nnphotography?max_results=100',
      {
        headers: {
          Authorization: basicAuth,
        },
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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
app.post('/send-email', (req, res) => {
  const { first_name, last_name, phone, subject, email, message } = req.body;
  // Email details.
  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.TO_EMAIL,
    subject: `${subject}`,
    text: `Name: ${first_name} ${last_name}\nPhone Number: ${phone}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email.
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      console.log('MailOptions: ', mailOptions);
      res
        .status(200)
        .json({ success: true, message: 'Email sent successfully' });
    }
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
