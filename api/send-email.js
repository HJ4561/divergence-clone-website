// api/send-email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { user_name, user_email, company, solver_used, message } = req.body;

    // Validate required fields
    if (!user_name || !user_email || !message) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required fields.' 
      });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['Admin@meshengg.com'],
      subject: `New Contact Form Submission from ${user_name}`,
      reply_to: user_email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; background: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; padding: 30px; background: #ffffff; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
            h2 { color: #22d3ee; margin-top: 0; font-size: 24px; }
            .field { margin: 16px 0; padding: 12px 16px; background: #f8f9fa; border-radius: 8px; border-left: 3px solid #22d3ee; }
            .label { font-weight: 600; color: #4a4a4a; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .value { color: #1a1a1a; font-size: 16px; }
            .footer { margin-top: 24px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #888; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>📬 New Contact Form Submission</h2>
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${user_name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${user_email}">${user_email}</a></div>
            </div>
            ${company ? `
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${company}</div>
            </div>
            ` : ''}
            ${solver_used ? `
            <div class="field">
              <div class="label">Solver Used</div>
              <div class="value">${solver_used}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="label">Message</div>
              <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="footer">
              This message was sent from the Meshengg contact form.
            </div>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      data 
    });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to send email. Please try again later.' 
    });
  }
}