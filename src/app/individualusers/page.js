"use client";
import React from "react";
import UsersTable from "../../components/usertable"; // Adjust path as needed
import PersistentDrawerLeft from "../success/page";
import { Grid } from "@mui/material";

const IndividualUsersPage = () => {
  return (
    // <div>
    //   <PersistentDrawerLeft />
    //   <h1
    //     style={{
    //       color: "black",
    //       marginBottom: "50px",
    //       textAlign: "Center",
    //       marginTop: "20px",
    //     }}
    //   >
    //     {" "}
    //     Dashboard/Individual users page
    //   </h1>

    //   <UsersTable />
    // </div>
    <Grid container spacing={0}>
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
