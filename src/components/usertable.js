"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Button,
} from "@mui/material";
import {
  FirstPageRounded as FirstPageRoundedIcon,
  LastPageRounded as LastPageRoundedIcon,
  ChevronLeftRounded as ChevronLeftRoundedIcon,
  ChevronRightRounded as ChevronRightRoundedIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import { tablePaginationClasses } from "@mui/base/TablePagination/TablePaginationClasses";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

const TableComponent = () => {
  const [token, setToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  if (!token) {
    return <p>Please log in to view this page.</p>;
  }

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <UsersTable
        token={token}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
      />
    </QueryClientProvider>
  );
};

const fetchUsers = async ({
  page = 1,
  pageSize = 10,
  type = "individual",
  role = "user",
  sortBy = "createdAt",
  sortDir = "desc",
  fields = "name,mobile,email,status",
  token,
}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(
      `https://liveload-api.vercel.app/api/v1/users?pageNo=${page}&pageSize=${pageSize}&type=${type}&role=${role}&sortBy=${sortBy}&sortDir=${sortDir}&fields=${fields}`,
      config
    );
    return response.data.result;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

const UsersTable = ({
  token,
  currentPage,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  const { data, isLoading, isError } = useQuery(
    ["users", currentPage, rowsPerPage],
    () =>
      fetchUsers({
        token,
        page: currentPage,
        pageSize: rowsPerPage,
      })
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data: {isError.message}</p>;

  const users = data?.data || [];
  const { totalPages, totalLength } = data?.meta_data || {};

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(1);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.name || "-"}</TableCell>
                <TableCell>{user.mobile || "-"}</TableCell>
                <TableCell>{user.email || "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    style={{
                      borderRadius: "12px",
                      backgroundColor:
                        user.status === "active" ? "#90EE90" : "#FF7F7F",
                      color: "#fff",
                    }}
                    disableElevation
                    disableRipple
                  >
                    {user.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <IconButton style={{ color: "#4caf50" }}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton style={{ color: "#1976d2" }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledTablePagination
        component="div"
        count={totalLength}
        page={currentPage - 1}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        labelRowsPerPage="Rows per page:"
        nextIconButtonText="Next page"
        backIconButtonText="Previous page"
        IconComponent={{
          firstPage: FirstPageRoundedIcon,
          lastPage: LastPageRoundedIcon,
          nextPage: ChevronRightRoundedIcon,
          previousPage: ChevronLeftRoundedIcon,
        }}
      />
    </div>
  );
};
const StyledTablePagination = styled(TablePagination)(
  ({ theme }) => `
    .${tablePaginationClasses.root} {
      background-color: ${
        theme.palette.mode === "dark" ? "#424242" : "#f0f0f0"
      };
      padding: ${theme.spacing(2)}px; /* Add padding for spacing */
      text-align: center; /* Center horizontally */
    }

    .${tablePaginationClasses.actions}, .${tablePaginationClasses.select} {
      flex-shrink: 0;
      color: ${theme.palette.mode === "dark" ? "#ffffff" : "#000000"};
    }

    .${tablePaginationClasses.selectLabel} {
      color: ${theme.palette.mode === "dark" ? "#ffffff" : "#000000"};
    }

    .${tablePaginationClasses.select} {
      margin: 0;
      border: 1px solid ${
        theme.palette.mode === "dark" ? "#ffffff" : "#000000"
      };
      background-color: transparent;
      color: ${theme.palette.mode === "dark" ? "#ffffff" : "#000000"};
      padding: ${theme.spacing(1)}px ${theme.spacing(2)}px;
      border-radius: 4px;
    }

    .${tablePaginationClasses.actions} > button {
      color: ${theme.palette.mode === "dark" ? "#ffffff" : "#000000"};
      border: 1px solid ${
        theme.palette.mode === "dark" ? "#ffffff" : "#000000"
      };
      background-color: transparent;
      margin: 0 ${theme.spacing(1)}px;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? "#616161" : "#e0e0e0"
        };
      }

      &:disabled {
        color: ${theme.palette.mode === "dark" ? "#9e9e9e" : "#757575"};
      }
    }
  `
);

export default TableComponent;