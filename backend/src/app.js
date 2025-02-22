const express = require('express');
const bodyParser = require('body-parser');
const transactionsRoutes = require('./routes/transactionsRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');
const barChartRoutes = require('./routes/barChartRoutes');
const pieChartRoutes = require('./routes/pieChartRoutes');
const combinedRoutes = require('./routes/combinedRoutes');
const { seedDatabase } = require('./services/seedService');
const connectDB = require('./database'); // Import the connectDB function
const cors = require("cors");

require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/transactions', transactionsRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/bar-chart', barChartRoutes);
app.use('/api/pie-chart', pieChartRoutes);
app.use('/api/combined', combinedRoutes);

connectDB(); // Connect to MongoDB

seedDatabase(); // Seed the database

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});