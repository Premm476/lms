import { Resend } from "resend";
import { PasswordResetEmail } from "../emails/password-reset";
import { WelcomeEmail } from "../emails/welcome-email";
import { NotificationEmail } from "../emails/notification-email";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.DEFAULT_FROM_EMAIL || 'onboarding@resend.dev';

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured in environment variables');
    }
    if (!fromEmail) {
      throw new Error('DEFAULT_FROM_EMAIL is not configured in environment variables');
    }
    
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Password Reset Request',
      react: PasswordResetEmail({ resetLink }),
    });
    
    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Email sending failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      config: {
        fromEmail,
        to: email,
        hasApiKey: !!process.env.RESEND_API_KEY
      }
    });
    throw error;
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured in environment variables');
    }
    if (!fromEmail) {
      throw new Error('DEFAULT_FROM_EMAIL is not configured in environment variables');
    }
    
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Welcome to Our Platform!',
      react: WelcomeEmail({ name }),
    });
    
    console.log('Welcome email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Welcome email sending failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      config: {
        fromEmail,
        to: email,
        hasApiKey: !!process.env.RESEND_API_KEY
      }
    });
    throw error;
  }
}

export async function sendNotificationEmail(email: string, title: string, message: string) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured in environment variables');
    }
    if (!fromEmail) {
      throw new Error('DEFAULT_FROM_EMAIL is not configured in environment variables');
    }
    
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: title,
      react: NotificationEmail({ title, message }),
    });
    
    console.log('Notification email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Notification email sending failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      config: {
        fromEmail,
        to: email,
        hasApiKey: !!process.env.RESEND_API_KEY
      }
    });
    throw error;
  }
}

export async function sendGeneralEmail(
  email: string,
  subject: string,
  content: React.ReactElement
) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured in environment variables');
    }
    if (!fromEmail) {
      throw new Error('DEFAULT_FROM_EMAIL is not configured in environment variables');
    }
    
    const response = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject,
      react: content,
    });
    
    console.log('General email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('General email sending failed:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      config: {
        fromEmail,
        to: email,
        hasApiKey: !!process.env.RESEND_API_KEY
      }
    });
    throw error;
  }
}
