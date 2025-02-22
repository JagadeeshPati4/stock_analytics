import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const StatisticsCards = ({ stats }) => {
  return (
    <Grid sx={{marginTop:1}} container spacing={2}>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Sales</Typography>
            <Typography variant="h4">${stats.totalSales}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Sold Items</Typography>
            <Typography variant="h4">{stats.soldItems}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography variant="h6">Unsold Items</Typography>
            <Typography variant="h4">{stats.unsoldItems}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StatisticsCards;
