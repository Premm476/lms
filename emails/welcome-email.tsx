import React from 'react';

interface WelcomeEmailProps {
  name: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ name }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#2563eb' }}>Welcome to Our Platform!</h1>
    <p>Hello {name},</p>
    <p>Thank you for joining our platform. We're excited to have you on board!</p>
    <p>Get started by exploring our features and courses available to you.</p>
    <p>If you have any questions, feel free to reach out to our support team.</p>
    <p style={{ marginTop: '20px' }}>Best regards,</p>
    <p>The Platform Team</p>
  </div>
);
