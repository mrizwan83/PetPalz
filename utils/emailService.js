// utils/emailService.js
import nodemailer from 'nodemailer';

// Create a transporter using your email service provider's configuration
const transporter = nodemailer.createTransport({
    // Configure your email service provider (e.g., Gmail, SendGrid, etc.)
    // Example configuration for Gmail:
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// Function to send email verification
export const sendEmailVerification = async (to, token) => {
    const verificationLink = `http://localhost:3000/verify-email?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Email Verification - PetPalz',
        html: `Please click <a href="${verificationLink}">here</a> to verify your email address.`,
    };

    await transporter.sendMail(mailOptions);
};

// Function to send password reset email
export const sendPasswordResetEmail = async (to, token) => {
    const resetLink = `http://localhost:3000/reset-password?token=${token}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject: 'Password Reset - PetPalz',
        html: `Please click <a href="${resetLink}">here</a> to reset your password.`,
    };

    await transporter.sendMail(mailOptions);
};