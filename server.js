// server.js
const express = require('express');
const { Resend } = require('resend');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/send-email', async (req, res) => {
  try {
    const { user_name, user_email, company, solver_used, message } = req.body;

    if (!user_name || !user_email || !message) {
      return res.status(400).json({ 
        error: 'Name, email, and message are required.' 
      });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['hamnamughal1208@gmail.com'],
      subject: `New Contact Form Submission from ${user_name}`,
      reply_to: user_email,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${user_name}</p>
        <p><strong>Email:</strong> ${user_email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Solver Used:</strong> ${solver_used || 'Not specified'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});