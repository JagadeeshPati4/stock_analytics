const Transaction = require("../models/transactionModel");

const fetchTransactions = async (req, res) => {
    try {
        let { search = "", page = 1, perPage = 10, month } = req.query;
        page = parseInt(page, 10);
        perPage = parseInt(perPage, 10);

        const query = {};
        const regex = new RegExp(search, "i");

        // Month Mapping (Handles both month names and numbers)
        if (month) {
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

            console.log(`Filtering for month: ${month} (${monthNumber})`);

            // Filter transactions for the given month across all years
            query.$expr = { $eq: [{ $month: "$dateOfSale" }, monthNumber] };
        }

        // Search Query
        if (search) {
            query.$or = [{ title: regex }, { description: regex }];
            if (!isNaN(search)) {
                query.$or.push({ price: parseFloat(search) });
            }
        }

        // Fetch transactions with pagination
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        const totalRecords = await Transaction.countDocuments(query);

        res.json({
            page,
            perPage,
            totalRecords,
            totalPages: Math.ceil(totalRecords / perPage),
            transactions
        });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Error fetching transactions", error: error.message });
    }
};

module.exports = { fetchTransactions };
