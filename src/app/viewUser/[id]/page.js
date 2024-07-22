"use client";
import React, { useEffect, useState } from "react";
import PersistentDrawerLeft from "@/app/success/page";
import {
  Typography,
  Paper,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  CircularProgress,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import Image from "next/image";

export default function IndividualUser() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchTokenAndUserId = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      } else {
        console.error("Token not found in local storage");
        return;
      }

      const pathname = window.location.pathname;
      const parts = pathname.split("/");
      const lastPathSegment = parts[parts.length - 1];
      const userIdFromPath = lastPathSegment;
      setUserId(userIdFromPath);
    };

    fetchTokenAndUserId();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (token && userId) {
        const url = `https://liveload-api.vercel.app/api/v1/users/${userId}`;

        try {
          const response = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = await response.json();
          setUserData(userData);
        } catch (error) {
          console.error("Error fetching user details:", error.message);
        } finally {
          setUserDataLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [token, userId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!token || !userId) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <PersistentDrawerLeft />
      <Typography
        variant="h5"
        component="div"
        sx={{
          fontSize: "clamp(0.875)",
          lineHeight: 1.57,
          fontFamily: "sans-serif",
          fontWeight: 600,
          color: "#262626",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "150px",
          left: "250px",
          maxWidth: "90vw",
          textAlign: "center",
        }}
      >
        Edit Individual User
      </Typography>
      {userDataLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            marginTop: 20,
            marginLeft: 30,
            padding: 3,
            border: "1px solid #ccc",
            height: 500,
            width: 1200,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            aria-label="user details tabs"
            sx={{ marginBottom: "20px" }}
          >
            <Tab label="Profile" />
            <Tab label="Addresses" />
            <Tab label="Orders" />
            <Tab label="Bank Details" />
            <Tab label="Transactions" />
          </Tabs>

          {activeTab === 0 && (
            <Box sx={{ marginTop: "20px" }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Box
                    height={300}
                    width={300}
                    my={4}
                    display="flex"
                    alignItems="center"
                    gap={4}
                    p={2}
                    sx={{ border: "2px solid #ccc " }}
                  >
                    <Image
                      alt="Profile Image"
                      src={userData.result.profileImageUrl || "/profile Image"}
                      style={{
                        color: "black",
                        alignItems: "center",
                        marginLeft: "100px",
                      }}
                      width={100}
                      height={100}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TableContainer
                    component={Paper}
                    sx={{
                      maxHeight: 300,
                      overflow: "auto",
                      marginTop: "30px",
                      marginRight: "100px",
                    }}
                  >
                    <Table aria-label="user details">
                      <TableBody>
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ minWidth: 50 }}
                          >
                            Name
                          </TableCell>
                          <TableCell style={{ minWidth: 50, height: 70 }}>
                            {userData.result.name || "-"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ minWidth: 80 }}
                          >
                            Email
                          </TableCell>
                          <TableCell style={{ minWidth: 50, height: 70 }}>
                            {userData.result.email || "-"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ minWidth: 80 }}
                          >
                            Mobile
                          </TableCell>
                          <TableCell style={{ minWidth: 50, height: 75 }}>
                            {userData.result.mobile || "-"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            style={{ minWidth: 80 }}
                          >
                            Wallet Balance
                          </TableCell>
                          <TableCell style={{ minWidth: 50, height: 75 }}>
                            {userData.result.walletBalance || "-"}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
