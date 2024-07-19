"use client";
import React from "react";
import UsersTable from "../../components/usertable";
import PersistentDrawerLeft from "../success/page";
import { Grid } from "@mui/material";

const IndividualUsersPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <PersistentDrawerLeft />
      </Grid>
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
        <UsersTable />
      </Grid>
    </Grid>
  );
};

export default IndividualUsersPage;
