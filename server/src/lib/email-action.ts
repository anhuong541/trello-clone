import config from "../config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.emailApp,
    pass: config.passApp,
  },
});

interface MessageConfig {
  from: {
    name: string;
    address: string;
  };
  to: string[] | string;
  subject: string;
  text: string;
  html: string;
}

const defaultMsgCon = {
  from: {
    name: "Trello clone bot",
    address: config.emailApp,
  },
  to: ["nguyenxuananhuong541@gmail.com"],
  subject: "Hello World",
  text: "this is the default message :> ",
  html: "<b>Hello World</b>",
};

export async function sendMail(msgConfig?: MessageConfig) {
  try {
    const info = await transporter.sendMail(msgConfig ?? defaultMsgCon);
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  } catch (error) {
    console.log("error sending email: ", error);
  }
}
