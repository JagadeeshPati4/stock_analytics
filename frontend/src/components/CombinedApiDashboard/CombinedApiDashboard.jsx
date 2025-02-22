import React, { useEffect, useState } from "react";
import { Container, Typography, MenuItem, Select, Grid, CircularProgress } from "@mui/material";
import TransactionsTable from "./TransactionsTable";
import StatisticsCards from "./StatisticsCards";
import BarChartComponent from "./BarChartComponent";
import CombinedPieChart from "./CombinedPieChart";
import { fetchCombinedData } from "./api";

const CombinedApiDashboard = () => {
  const [month, setMonth] = useState("March");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCombinedData(month)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [month]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>📊 Combined API Dashboard</Typography>

      {/* Month Selector */}
      <Select value={month} onChange={(e) => setMonth(e.target.value)} fullWidth>
        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => (
          <MenuItem key={m} value={m}>{m}</MenuItem>
        ))}
      </Select>

      {/* Loading State */}
      {loading && <CircularProgress sx={{ marginTop: 3 }} />}

      {!loading && data && (
        <>
          {/* Statistics Cards */}
          <StatisticsCards stats={data.statistics} />

          {/* Transactions Table */}
          <TransactionsTable transactions={data.transactions} />

          {/* Charts */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <BarChartComponent chartData={data.barChart} />
            </Grid>
            <Grid item xs={6}>
              <CombinedPieChart pieChartData={data.pieChart} statisticsData={data.statistics} />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default CombinedApiDashboard;
