const axios = require("axios");
require('dotenv').config(); // Load environment variables from .env file

const Back_end_URL = process.env.Back_end_URL; // Use the environment variable

const monthMap = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
};

const getCombinedData = async (req, res) => {
    try {
        let { month } = req.query;

        // Normalize month input (allow both name and number)
        if (typeof month === "string") {
            month = month.toLowerCase();
            month = monthMap[month] || parseInt(month, 10);
        }

        if (isNaN(month) || month < 1 || month > 12) {
            return res.status(400).json({ message: "Invalid month. Use a number (1-12) or name (e.g., March)." });
        }

        // Define API endpoints
        const endpoints = {
            transactions: `${Back_end_URL}/api/transactions?month=${month}`,
            statistics: `${Back_end_URL}/api/statistics?month=${month}`,
            barChart: `${Back_end_URL}/api/bar-chart?month=${month}`,
            pieChart: `${Back_end_URL}/api/pie-chart?month=${month}`
        };

        // Fetch all data in parallel with improved error handling
        const fetchData = async (url) => {
            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error(`Error fetching ${url}:`, error.message);
                return { error: error.message };
            }
        };

        const [transactions,statistics, barChart, pieChart] = await Promise.all([
            fetchData(endpoints.transactions),
            fetchData(endpoints.statistics),
            fetchData(endpoints.barChart),
            fetchData(endpoints.pieChart)
        ]);

        // Combine results
        const combinedData = { transactions,statistics, barChart, pieChart };

        res.status(200).json(combinedData);
    } catch (error) {
        console.error("Error in getCombinedData:", error.message);
        res.status(500).json({ message: "Error fetching combined data", error: error.message });
    }
};

module.exports = { getCombinedData };
