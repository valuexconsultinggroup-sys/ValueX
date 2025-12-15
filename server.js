require('dotenv').config(); // Load environment variables
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Middleware
app.use(cors()); // Allow requests from any origin (fine for dev/Codespaces)
app.use(bodyParser.json());

// CONFIGURATION: Setup Gmail SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    // Use environment variables instead of hardcoded strings
    user: process.env.GMAIL_USER, 
    pass: process.env.GMAIL_APP_PASSWORD 
  }
});

// Default route to check if server is alive in Codespaces
app.get('/', (req, res) => {
  res.send('Backend server is running! You can now send POST requests to /api/send-email');
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
     console.error('Missing Environment Variables');
     return res.status(500).json({ success: false, message: 'Server configuration error' });
  }

  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`, 
      to: process.env.GMAIL_USER, // Sending TO yourself (or change to another env var)
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});