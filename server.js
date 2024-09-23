const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (like index.html)

// In-memory storage for users (for demo purposes)
const users = {
    'user@example.com': { password: 'password123', username: 'user' }
};

// POST endpoint for password reset
app.post('/api/reset-password', (req, res) => {
    const { email } = req.body;

    if (users[email]) {
        // Here you would normally send an email with a reset link
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: 'your_email@gmail.com',
                pass: 'your_email_password'
            }
        });

        const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: 'Click the link to reset your password: [link goes here]'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Error sending email' });
            }
            res.json({ success: true });
        });
    } else {
        res.status(400).json({ success: false, message: 'Email not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
