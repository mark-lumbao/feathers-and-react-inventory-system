import nodemailer, { SendMailOptions } from 'nodemailer';

export const sleep = (ms: number): Promise<any> => new Promise((resolve) => setTimeout(resolve, ms));

export function pad(size: number, num: number): string {
  let s = String(num);
  while (s.length < (size || 2)) { s = `0${s}`; }
  return s;
}

export function formatDate(timeStamp: number): string {
  const date = new Date(timeStamp);
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
}

export function uuid(): string {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

export async function sendMail(mailProps: SendMailOptions): Promise<any> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: process.env.SENDGRID_API_KEY, // generated ethereal password
    },
  });

  try {
    const info = await transporter.sendMail(mailProps);
    return info;
  } catch (error) {
    throw new Error(error);
  }
}
