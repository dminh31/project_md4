const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anhduc31125@gmail.com",
    pass: "cxac blaj ywsf qsym",
  },
});

export {
  transporter,
};