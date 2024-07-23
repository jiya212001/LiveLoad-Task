"use client";
import React from "react";
import { Grid } from "@mui/material";
import TableComponent from "../api/v1/users";

const IndividualUsersPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}></Grid>
      <Grid
        item
        xs={12}
        md={11}
        style={{
          width: "100vw",
          marginLeft: "230px",
          marginTop: "30px",
        }}
      >
        <TableComponent />
      </Grid>
    </Grid>
  );
};

export default IndividualUsersPage;
