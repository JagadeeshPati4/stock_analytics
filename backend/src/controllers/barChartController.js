const Transaction = require("../models/transactionModel");

const getBarChartData = async (req, res) => {
    try {
        let { month } = req.query;

        if (!month) {
            return res.status(400).json({ message: "Month parameter is required." });
        }

        // Convert month name to number if needed
        const monthNames = {
            january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
            july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
        };

        let monthNumber = parseInt(month, 10);
        if (isNaN(monthNumber)) {
            monthNumber = monthNames[month.toLowerCase()];
        }

        if (!monthNumber || monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ message: "Invalid month. Use a valid month name or number (1-12)." });
        }

        console.log(`Fetching bar chart data for month: ${month} (${monthNumber})`);

        // MongoDB Aggregation Query to filter transactions by month across all years
        const transactions = await Transaction.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
                }
            },
            {
                $group: {
                    _id: {
                        $switch: {
                            branches: [
                                { case: { $lte: ["$price", 100] }, then: "0-100" },
                                { case: { $and: [{ $gt: ["$price", 100] }, { $lte: ["$price", 200] }] }, then: "101-200" },
                                { case: { $and: [{ $gt: ["$price", 200] }, { $lte: ["$price", 300] }] }, then: "201-300" },
                                { case: { $and: [{ $gt: ["$price", 300] }, { $lte: ["$price", 400] }] }, then: "301-400" },
                                { case: { $and: [{ $gt: ["$price", 400] }, { $lte: ["$price", 500] }] }, then: "401-500" },
                                { case: { $and: [{ $gt: ["$price", 500] }, { $lte: ["$price", 600] }] }, then: "501-600" },
                                { case: { $and: [{ $gt: ["$price", 600] }, { $lte: ["$price", 700] }] }, then: "601-700" },
                                { case: { $and: [{ $gt: ["$price", 700] }, { $lte: ["$price", 800] }] }, then: "701-800" },
                                { case: { $and: [{ $gt: ["$price", 800] }, { $lte: ["$price", 900] }] }, then: "801-900" },
                                { case: { $gt: ["$price", 900] }, then: "901-above" }
                            ],
                            default: "unknown"
                        }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Initialize response with all categories set to 0
        const priceData = {
            "0-100": 0, "101-200": 0, "201-300": 0, "301-400": 0, "401-500": 0,
            "501-600": 0, "601-700": 0, "701-800": 0, "801-900": 0, "901-above": 0
        };

        // Populate response with actual data
        transactions.forEach(bucket => {
            if (priceData.hasOwnProperty(bucket._id)) {
                priceData[bucket._id] = bucket.count;
            }
        });

        res.json(priceData);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Error fetching bar chart data", error: error.message });
    }
};

module.exports = { getBarChartData };
