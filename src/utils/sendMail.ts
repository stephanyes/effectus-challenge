import nodemailer from "nodemailer";

const sendMail = async (to: string, subject: string, html: string) => {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false,
    auth: {
      user: "admin-effectus@example.com",
      pass: "effectus",
    },
  });

  // Define the email options
  const mailOptions = {
    from: "noreply@example.com",
    to,
    subject,
    html,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
};

export default sendMail;
