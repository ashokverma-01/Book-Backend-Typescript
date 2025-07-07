import transporter from "./emailTransporter.js";

const sendMail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    return true;
  } catch (error) {
    console.error("Failed to send mail:", error);
    throw new Error("Failed to send OTP email");
  }
};

export default sendMail;
