const path = require("path");
const express = require("express");

const app = express();

app.use(express.json());
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
    "1//047zP5KeDmlnACgYIARAAGAQSNwF-L9Ir-4cUvQarZXEsUiHXOb-0w2xZuN9mxvVnnETeV7FhbQ1M14xwDQqv9SL_Ajr1ARoZPlQ",
});

const myAccessToken =
  "ya29.A0AVA9y1vBkVUjtD5zcSGdlohSxtP85s37U74JVHGSOSh-tuRLTLjxomcdfgXQSxUM2DIdFKEvhWg_XJHXID4mQeFYMBkjk9EnRPXF-6mGvGR_u28tciGsqWTuObUJtm_uW7l1Ksl2UnnGARk9dHWMC3-NE47_YUNnWUtBVEFTQVRBU0ZRRTY1ZHI4LXNFd3hMbG5DUU9xbGpHbjc3TjRmdw0163";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "urinfo.examssolutions12@gmail.com", //your gmail account you used to set the project up in google cloud console"
    clientId:
      "975964328766-lb0a57ub29amqfq90spg2lk6bqiu0kvv.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//043SHn5nyXuBVCgYIARAAGAQSNwF-L9Ir3spMx5N350TDlpeYeTMyZvZ1ZH3Cm4shjSnvwu_8hAlSs_jJKVrEplS-inDxFG7FD_s",
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
    req.json({ success: `email has been sent successfully to ${email}` });
    done(err, "done");
  });
});

module.exports = app;
