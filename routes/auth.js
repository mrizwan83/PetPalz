// routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

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
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
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

export default router;