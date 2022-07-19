const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "public")));

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");

// MAILING OPTION
const myOAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

myOAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const myAccessToken = process.env.ACCESS_TOKEN;

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.USER, //your gmail account you used to set the project up in google cloud console"
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: myAccessToken, //access token variable we defined earlier
  },
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.post("/send-email", async (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    to: email,
    from: process.env.USER,
    subject: "Automanted Email",
    html: `<h1>This is an automated email send with nodemailer in nodejs. Hope you are good</h1>.`,
  };

  transport.sendMail(mailOptions, (err) => {
    console.log({ success: `email has been sent successfully to ${email}` });
    if (err) {
      return console.log(err);
    }
    res.send({ success: "email is sent successfully" });
  });
});

module.exports = app;
