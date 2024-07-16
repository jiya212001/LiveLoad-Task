"use client";
import React from "react";
import UsersTable from "../../components/usertable"; // Adjust path as needed
import PersistentDrawerLeft from "../success/page";
const IndividualUsersPage = () => {
  return (
    <div>
      <PersistentDrawerLeft />
      <h1
        style={{
          color: "black",
          marginBottom: "50px",
          textAlign: "Center",
          marginTop: "20px",
        }}
      >
        {" "}
        Dashboard/Individual users page
      </h1>

      <UsersTable />
    </div>
  );
};

export default IndividualUsersPage;
