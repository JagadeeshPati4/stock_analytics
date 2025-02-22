# backend-api-project/backend-api-project/README.md

# Backend API Project

## Overview
This project is a backend API that initializes a database with seed data from a third-party API and provides various endpoints for managing transactions, statistics, and chart data.

## Features
- Seed the database with data from a third-party API.
- List transactions with search and pagination functionality.
- Calculate statistics such as total sales, sold items, and unsold items for a specified month.
- Provide bar chart data based on item counts in specified price ranges.
- Provide pie chart data based on unique categories and item counts.
- Combine responses from statistics, bar chart, and pie chart APIs into a single response.

## Project Structure
```
backend-api-project
├── src
│   ├── controllers          # Contains controller files for handling API requests
│   ├── models               # Contains model files for database schemas
│   ├── routes               # Contains route files for API endpoints
│   ├── services             # Contains service files for business logic
│   ├── app.js               # Entry point of the application
│   └── database.js          # Database connection and configuration
├── package.json             # NPM configuration file
├── .env                     # Environment variables
└── README.md                # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd backend-api-project
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add your environment variables (e.g., database connection strings).

## Usage
1. Start the server:
   ```
   npm start
   ```
2. The API will be available at `http://localhost:5000`.

## API Endpoints
- **Transactions**
  - `GET /api/transactions`: List transactions with optional search and pagination.
  
- **Statistics**
  - `GET /api/statistics`: Get total sales, sold items, and unsold items for a specified month.
  
- **Bar Chart Data**
  - `GET /api/bar-chart`: Get the number of items in specified price ranges for a given month.
  
- **Pie Chart Data**
  - `GET /api/pie-chart`: Get unique categories and count the number of items in each category for a specified month.
  
- **Combined Response**
  - `GET /api/combined`: Get a combined response from statistics, bar chart, and pie chart APIs.

## License
This project is licensed under the MIT License.