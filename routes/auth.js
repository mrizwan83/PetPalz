// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendEmailVerification, sendPasswordResetEmail } from '../utils/emailService.js';

const router = express.Router();

// Register a new user with email/password
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Generate email verification token
        const verificationToken = jwt.sign(
            { userId: savedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send email verification
        await sendEmailVerification(savedUser.email, verificationToken);

        res.status(201).json({ message: 'User registered successfully. Please verify your email.' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// routes/auth.js
router.post('/verify-email', async (req, res) => {
    try {
        const { token } = req.body;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isVerified = true;
        await user.save();

        res.json({ message: 'Email verified successfully' });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({ message: 'Error verifying email' });
    }
});

// Login with email/password
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login with Google
router.post('/google', async (req, res) => {
    try {
        const { googleId, name, email } = req.body;

        // Check if user already exists
        let user = await User.findOne({ googleId });

        if (!user) {
            // Create a new user if not exists
            user = new User({
                name,
                email,
                googleId,
            });

            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({ token });
    } catch (error) {
        console.error('Error logging in with Google:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login with GitHub
router.post('/github', async (req, res) => {
    try {
        const { githubId, name, email } = req.body;

        // Check if user already exists
        let user = await User.findOne({ githubId });

        if (!user) {
            // Create a new user if not exists
            user = new User({
                name,
                email,
                githubId,
            });

            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

        res.json({ token });
    } catch (error) {
        console.error('Error logging in with GitHub:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Request password reset
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate password reset token
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Save the reset token and expiry to the user document
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
        await user.save();

        // Send password reset email
        await sendPasswordResetEmail(user.email, resetToken);

        res.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error('Error requesting password reset:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset password
router.post('/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const user = await User.findOne({
            _id: userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        if (!password || password.trim().length === 0) {
            return res.status(400).json({ message: 'Password cannot be empty' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password and clear the reset token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;