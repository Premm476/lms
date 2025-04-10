import React from 'react';

interface NotificationEmailProps {
  title: string;
  message: string;
}

export const NotificationEmail: React.FC<NotificationEmailProps> = ({ title, message }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#2563eb' }}>{title}</h1>
    <p>{message}</p>
    <p style={{ marginTop: '20px' }}>Best regards,</p>
    <p>The Platform Team</p>
  </div>
);
