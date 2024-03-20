// routes/pet.js
import express from 'express';
import Pet from '../models/Pet.js';

const router = express.Router();

// Get all pet profiles for a specific user with pagination and sorting
router.get('/user/:userId', async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
        const skip = (page - 1) * limit;

        const pets = await Pet.find({ owner: req.params.userId })
            .populate('owner', 'name email')
            .sort(sort)
            .skip(skip)
            .limit(limit);

        res.json(pets);
    } catch (error) {
        console.error('Error retrieving user pet profiles:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new pet profile
router.post('/', async (req, res) => {
    try {
        const { name, species, breed, age, description, images } = req.body;
        const owner = req.user.userId; // Assuming authentication middleware sets req.user

        const newPet = new Pet({
            name,
            species,
            breed,
            age,
            owner,
            description,
            images,
        });

        const savedPet = await newPet.save();

        res.status(201).json(savedPet);
    } catch (error) {
        console.error('Error creating pet profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all pet profiles
router.get('/', async (req, res) => {
    try {
        const pets = await Pet.find().populate('owner', 'name email');
        res.json(pets);
    } catch (error) {
        console.error('Error retrieving pet profiles:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single pet profile
router.get('/:id', async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id).populate('owner', 'name email');
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json(pet);
    } catch (error) {
        console.error('Error retrieving pet profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a pet profile
router.put('/:id', async (req, res) => {
    try {
        const { name, species, breed, age, description, images } = req.body;
        const owner = req.user.userId; // Assuming authentication middleware sets req.user

        const updatedPet = await Pet.findByIdAndUpdate(
            req.params.id,
            { name, species, breed, age, owner, description, images },
            { new: true }
        );

        if (!updatedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        res.json(updatedPet);
    } catch (error) {
        console.error('Error updating pet profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a pet profile
router.delete('/:id', async (req, res) => {
    try {
        const deletedPet = await Pet.findByIdAndDelete(req.params.id);
        if (!deletedPet) {
            return res.status(404).json({ message: 'Pet not found' });
        }
        res.json({ message: 'Pet profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting pet profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;