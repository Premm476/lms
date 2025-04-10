import { sendPasswordResetEmail } from 'lib/email';
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: true,
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Skip authentication for testing purposes
  const { email } = req.body;

  try {
    console.log('Attempting to send test email to:', email);
    await sendPasswordResetEmail(email, 'https://example.com/reset?token=test123');
    console.log('Test email sent successfully to:', email);
    return res.status(200).json({ message: 'Test email sent' });
  } catch (error) {
    console.error('Test email error:', error);
    return res.status(500).json({ 
      message: 'Failed to send test email',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
