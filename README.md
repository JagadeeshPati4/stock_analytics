# Full Stack MERN Project - Transactions Dashboard

This project is a full-stack application built using the MERN (MongoDB, Express.js, React, Node.js) stack. The backend provides APIs to fetch and analyze transaction data, while the frontend displays the data using interactive tables and charts.

## Features
- **Backend**
  - Fetches and stores transaction data from a third-party API.
  - Provides APIs for searching, filtering, and pagination.
  - Generates statistics like total sales and item counts.
  - Supports visualization with bar and pie charts.

- **Frontend**
  - Displays transaction data in a table with search and pagination.
  - Allows users to select a month for filtering transactions.
  - Shows key statistics in a user-friendly interface.
  - Uses charts to visualize transaction trends.

## Tech Stack
### Frontend:
- Vite (React)
- Material UI (MUI) for UI components
- Axios for API requests
- Recharts for data visualization

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ORM)
- Axios for fetching third-party API data

## Installation
### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Steps
1. **Clone the repository**
   ```sh
   git clone <repository_url>
   cd <project_directory>
   ```
2. **Backend Setup**
   ```sh
   cd backend
   npm install
   npm start
   ```
   The backend server will run on `http://localhost:5000`

3. **Frontend Setup**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/transactions?month=<month>&search=<query>&page=<page>` | Fetch paginated transactions |
| GET | `/api/statistics?month=<month>` | Get total sales, sold & unsold items |
| GET | `/api/bar-chart?month=<month>` | Get price range distribution |
| GET | `/api/pie-chart?month=<month>` | Get category-wise item count |

## Project Structure
```
├── backend
│   ├── controllers       # API logic
│   ├── models            # MongoDB schemas
│   ├── routes            # Express routes
│   ├── config            # Database connection
│   ├── index.js          # Main server file
├── frontend
│   ├── components        # Reusable UI components
│   ├── pages             # Main views
│   ├── hooks             # Custom hooks
│   ├── services          # API calls
│   ├── App.js            # Main app component
│   ├── main.jsx          # Entry point
│   ├── styles.css        # Global styles
├── package.json          # Dependencies
├── README.md             # Documentation
```

## Deployment
### Backend Deployment
1. Set up a cloud MongoDB database.
2. Deploy the backend on a cloud server (Heroku, AWS, or Render).
3. Set environment variables for database connection.

### Frontend Deployment
1. Run `npm run build` in the frontend directory.
2. Deploy the `dist/` folder on Netlify or Vercel.

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push and create a Pull Request.

## License
This project is open-source under the [MIT License](LICENSE).

