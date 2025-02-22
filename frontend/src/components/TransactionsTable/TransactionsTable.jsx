import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from "@mui/material";

const TransactionsTable = ({ transactions }) => {
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.transactions.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer component={Paper}>
      <TextField 
        label="Search Transactions" 
        variant="outlined" 
        fullWidth 
        margin="dense"
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Sold</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <img src={item.image} alt={item.title} width="50" />
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.sold ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
