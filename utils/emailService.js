// utils/emailService.js
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.SENDGRID_API_KEY)
console.log(process.env.EMAIL_FROM)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmailVerification = async (to, token) => {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    const message = {
        to,
        from: process.env.EMAIL_FROM,
        subject: 'Email Verification - PetPalz',
        html: `Please click <a href="${verificationLink}">here</a> to verify your email address.`,
    };

    try {
        await sgMail.send(message);
        console.log('Email verification sent successfully');
    } catch (error) {
        console.error('Error sending email verification:', error);
        throw new Error('Failed to send email verification');
    }
};

export const sendPasswordResetEmail = async (to, token) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const message = {
        to,
        from: process.env.EMAIL_FROM,
        subject: 'Password Reset - PetPalz',
        html: `Please click <a href="${resetLink}">here</a> to reset your password.`,
    };

    try {
        await sgMail.send(message);
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
};