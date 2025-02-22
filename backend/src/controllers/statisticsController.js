const Transaction = require('../models/transactionModel');

const getStatistics = async (req, res) => {
    try {
        let { month } = req.query;

        if (!month) {
            return res.status(400).json({ message: "Month is required." });
        }

        // Convert month name to number (handling both names and numbers)
        const monthNames = {
            january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
            july: 7, august: 8, september: 9, october: 10, november: 11, december: 12
        };

        let monthNumber = parseInt(month, 10);

        if (isNaN(monthNumber)) {
            monthNumber = monthNames[month.toLowerCase()];
        }

        if (!monthNumber || monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ message: "Invalid month. Use 1-12 or full month name." });
        }

        console.log(`Fetching statistics for month: ${month} (${monthNumber})`);

        // Fetch statistics across all years for the selected month
        const statistics = await Transaction.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] }
                }
            },
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] } },
                    soldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
                    unsoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }
                }
            }
        ]);

        console.log(`Statistics: ${JSON.stringify(statistics)}`);

        res.status(200).json(statistics[0] || { totalSales: 0, soldItems: 0, unsoldItems: 0 });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Error retrieving statistics", error: error.message });
    }
};

module.exports = { getStatistics };
