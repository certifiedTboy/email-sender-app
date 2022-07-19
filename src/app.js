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
  "975964328766-lb0a57ub29amqfq90spg2lk6bqiu0kvv.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
);

myOAuth2Client.setCredentials({
  refresh_token:
    "1//04dGSAQY5OqrKCgYIARAAGAQSNwF-L9IrJcjGmHEHigJIpzI21EVbMZAmWnXXME75db0mVI5nHMsEzpmt7z6XHBcKqfYWRoLUGxQ",
});

const myAccessToken =
  "ya29.A0AVA9y1vk2Zd4RmntWny2kquhZGEbH0oV9UMphltqpEUJiuK0DnUXdY9WWepLDMrLG2NwtrPACQwprA009-RKpt1CsZKe8kJgIcwQ32rIvk3useclMKYhQBHqxRs_zYGizK74ThGeTYIV0uhBHvXmtE43z8m3YUNnWUtBVEFTQVRBU0ZRRTY1ZHI4a0NwTFAtcnJYMjl1MFFDcXNEejhQZw0163";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "etosin70@gmail.com", //your gmail account you used to set the project up in google cloud console"
    clientId:
      "975964328766-lb0a57ub29amqfq90spg2lk6bqiu0kvv.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04dGSAQY5OqrKCgYIARAAGAQSNwF-L9IrJcjGmHEHigJIpzI21EVbMZAmWnXXME75db0mVI5nHMsEzpmt7z6XHBcKqfYWRoLUGxQ",
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
    from: "etosin70@gmail.com",
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
