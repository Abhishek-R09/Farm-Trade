import nodemailer from "nodemailer";
const user = process.env.EMAIL_ID;
const pass = process.env.EMAIL_PASSWD;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

export const sendConfirmationEmail = async (name, email, confirmationCode) => {
  // console.log("Check");
  try {
    await transport.sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<div><h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for signing up. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
            <p>&#169; <a href="http://localhost:3000/>FarmTrade.com</a> 
            </div>`,
    });
  } catch (err) {
    console.log(err);
  }
};
