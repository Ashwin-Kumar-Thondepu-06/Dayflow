import nodemailer from 'nodemailer';
import { config } from '../config';

// Create a generic transporter
// In production, configure SMTP details in .env
const createTransporter = async () => {
  // Use ethereal for development if no SMTP config is provided
  if (!config.SMTP_HOST) {
    const testAccount = await nodemailer.createTestAccount();
    console.log(`[Mailer] Creating Ethereal test account: ${testAccount.user}`);
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  return nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: parseInt(config.SMTP_PORT || '587'),
    secure: config.SMTP_PORT === '465',
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });
};

export const sendCredentialsEmail = async (to: string, name: string, employeeCode: string, plaintextPassword: string) => {
  try {
    const transporter = await createTransporter();
    
    const info = await transporter.sendMail({
      from: config.SMTP_FROM || '"DayFlow Admin" <no-reply@dayflow.app>',
      to,
      subject: 'Welcome to DayFlow - Your Account Details',
      text: `Hello ${name},\n\nYour DayFlow account has been created.\n\nEmployee ID: ${employeeCode}\nPassword: ${plaintextPassword}\n\nPlease login and change your password immediately.\n\nBest,\nDayFlow Team`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2>Welcome to DayFlow!</h2>
          <p>Hello ${name},</p>
          <p>Your account has been created by your administrator. You can login using the credentials below:</p>
          <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px; display: inline-block; margin-top: 8px; margin-bottom: 8px;">
            <p style="margin: 0;"><strong>Employee ID:</strong> ${employeeCode}</p>
            <p style="margin: 0; margin-top: 8px;"><strong>Password:</strong> ${plaintextPassword}</p>
          </div>
          <p><em>Note: You will be required to change this password on your first login.</em></p>
          <p>Best regards,<br>The DayFlow Team</p>
        </div>
      `,
    });

    console.log(`[Mailer] Email sent to ${to}. Message ID: ${info.messageId}`);
    if (!config.SMTP_HOST) {
      console.log(`[Mailer] Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (error) {
    console.error(`[Mailer] Error sending email to ${to}:`, error);
  }
};
