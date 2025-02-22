const axios = require('axios');
const Transaction = require('../models/transactionModel');
require('dotenv').config();

const SEED_API_URL = process.env.THIRD_PARTY_API_URL;
const BATCH_SIZE = 100;

const seedDatabase = async () => {
    try {
        // Check if the collection already has data
        const existingCount = await Transaction.countDocuments();
        if (existingCount > 0) {
            console.log('Database already contains transactions. Skipping seeding.');
            return;
        }

        // Fetch transaction data
        const response = await axios.get(SEED_API_URL);
        const transactions = response.data;

        if (!transactions || transactions.length === 0) {
            console.log('No transactions found in API response.');
            return;
        }

        // Insert in batches
        for (let i = 0; i < transactions.length; i += BATCH_SIZE) {
            const batch = transactions.slice(i, i + BATCH_SIZE);
            await Transaction.insertMany(batch, { timeout: 60000 });
        }

        console.log('Database seeded successfully.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

module.exports = { seedDatabase };
