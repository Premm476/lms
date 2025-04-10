import React from 'react';

interface PasswordResetEmailProps {
  resetLink: string;
}

export const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({ resetLink }) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#2563eb' }}>Password Reset Request</h1>
    <p>We received a request to reset your password. Click the button below to proceed:</p>
    <a 
      href={resetLink}
      style={{
        display: 'inline-block',
        padding: '12px 24px',
        backgroundColor: '#2563eb',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '4px',
        margin: '20px 0'
      }}
    >
      Reset Password
    </a>
    <p>If you didn't request this, please ignore this email.</p>
    <p style={{ color: '#6b7280', fontSize: '14px' }}>
      This link will expire in 1 hour.
    </p>
  </div>
);
