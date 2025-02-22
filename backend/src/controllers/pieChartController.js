const Transaction = require("../models/transactionModel");

const getPieChartData = async (req, res) => {
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

        console.log(`Fetching pie chart data for month: ${month} (${monthNumber})`);

        // MongoDB Aggregation Query to filter by month across all years
        const categoryCounts = await Transaction.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    category: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json(categoryCounts);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Error fetching pie chart data", error: error.message });
    }
};

module.exports = { getPieChartData };
