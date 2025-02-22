const axios = require('axios');
const Transaction = require('../models/transactionModel');
require('dotenv').config(); // Load environment variables from .env file

const SEED_API_URL = process.env.THIRD_PARTY_API_URL; // Use the environment variable

const BATCH_SIZE = 100; // Define the batch size

const seedDatabase = async () => {
    try {
        // Clear the transactions collection
        await Transaction.deleteMany({});

        const response = await axios.get(SEED_API_URL);
        const transactions = response.data;

        // Insert documents in batches
        for (let i = 0; i < transactions.length; i += BATCH_SIZE) {
            const batch = transactions.slice(i, i + BATCH_SIZE);
            await Transaction.insertMany(batch, { timeout: 60000 }); // Increase timeout to 60 seconds
        }

        console.log('Database seeded successfully with transaction data.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

module.exports = { seedDatabase };