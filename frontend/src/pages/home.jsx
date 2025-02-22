import React, { useEffect, useState } from "react";
import { Container, Typography, MenuItem, Select, Box, Grid, useTheme } from "@mui/material";
import TransactionsTable from '../components/TransactionsTable/TransactionsTable';
import StatisticsCards from "../components/Statistics/Statistics";
import BarChartComponent from "../components/BarChart/BarChart";
import PieChartComponent from "../components/PieChart/PieChart";
import { fetchCombinedData } from "../services/api";

const Dashboard = () => {
  const theme = useTheme();
  const [month, setMonth] = useState("March");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCombinedData(month).then((res) => setData(res.data));
  }, [month]);

  return (
    <Container fullWidth
      sx={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        padding: theme.spacing(3),
      }}
    >
      <Typography variant="h4" gutterBottom sx={{textAlign: 'center'}}>
        Transactions Dashboard
      </Typography>

      {/* Month Selector */}
      <Box sx={{ mb: 3 }}>
        <Select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[1],
          }}
        >
          {[
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ].map((m) => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </Select>
      </Box>

      {/* Transactions Table */}
      {data && <TransactionsTable transactions={data.transactions} />}

      {/* Statistics Cards */}
      {data && <StatisticsCards stats={data.statistics} />}

      {/* Charts */}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          {data && <BarChartComponent chartData={data.barChart} />}
        </Grid>
        <Grid item xs={12} md={6}>
          {data && <PieChartComponent chartData={data.pieChart} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
