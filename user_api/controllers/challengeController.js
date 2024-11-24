// controllers/challengeController.js
const Challenge = require('../models/challenge');

// Create a new challenge
exports.createChallenge = async (req, res) => {
    try {
        const { description, difficultyLevel, scoringCriteria } = req.body;

        const newChallenge = new Challenge({
            description,
            difficultyLevel,
            scoringCriteria
        });

        await newChallenge.save();
        res.status(201).json({ message: 'Challenge created successfully', challenge: newChallenge });
    } catch (error) {
        res.status(500).json({ message: 'Error creating challenge', error: error.message });
    }
};

// Get all challenges
exports.getAllChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();
        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching challenges', error: error.message });
    }
};

// Get a challenge by ID
exports.getChallengeById = async (req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json(challenge);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching challenge', error: error.message });
    }
};

// Update a challenge by ID
exports.updateChallenge = async (req, res) => {
    try {
        const { description, difficultyLevel, scoringCriteria } = req.body;
        const updatedChallenge = await Challenge.findByIdAndUpdate(
            req.params.id,
            { description, difficultyLevel, scoringCriteria },
            { new: true }
        );

        if (!updatedChallenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        res.status(200).json({ message: 'Challenge updated successfully', challenge: updatedChallenge });
    } catch (error) {
        res.status(500).json({ message: 'Error updating challenge', error: error.message });
    }
};

// Delete a challenge by ID
exports.deleteChallenge = async (req, res) => {
    try {
        const deletedChallenge = await Challenge.findByIdAndDelete(req.params.id);
        if (!deletedChallenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }
        res.status(200).json({ message: 'Challenge deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting challenge', error: error.message });
    }
};