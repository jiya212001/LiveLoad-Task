"use client";
import React, { useState, useEffect } from "react";
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
  Typography,
  Grid,
  TextField,
  CircularProgress,
  useMediaQuery,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  FirstPageRounded as FirstPageRoundedIcon,
  LastPageRounded as LastPageRoundedIcon,
  ChevronLeftRounded as ChevronLeftRoundedIcon,
  ChevronRightRounded as ChevronRightRoundedIcon,
  SearchRounded as SearchIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import UserDetailsLink from "@/components/userlink";
import { tablePaginationClasses } from "@mui/base/TablePagination/tablePaginationClasses";
import { fetchUsers } from "../api/api";

const debounce = (func, delay) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

const queryClient = new QueryClient();

const TableComponent = () => {
  const [token, setToken] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const debouncedSearch = debounce((value) => {
    setCurrentPage(1);
    setSearchQuery(value);
  }, 300);

  const theme = createTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!token) {
    return <p>Please log in to view this page.</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ marginLeft: "230px" }}>
          <QueryClientProvider client={queryClient}>
            <div style={{ marginBottom: 20, textAlign: "right" }}>
              <Typography
                variant="h6"
                style={{ color: "black", textAlign: "center" }}
              >
                Dashboard/Individual User
              </Typography>
              <TextField
                label="Search by Name, Mobile, Email"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => debouncedSearch(e.target.value)}
                InputProps={{
                  endAdornment: <SearchIcon />,
                }}
                style={{
                  width: "100%",
                  maxWidth: 300,
                  marginRight: isSmallScreen ? 0 : "34px",
                  marginTop: isSmallScreen ? "10px" : "23px",
                }}
              />
            </div>
            {isLoading ? (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <CircularProgress />
              </div>
            ) : (
              <UsersTable
                token={token}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={setRowsPerPage}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery("")}
                setIsLoading={setIsLoading}
              />
            )}
          </QueryClientProvider>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const UsersTable = ({
  token,
  currentPage,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  searchQuery,
  setIsLoading,
}) => {
  const { data, isLoading, isError } = useQuery(
    ["users", currentPage, rowsPerPage, searchQuery],
    () =>
      fetchUsers({
        token,
        page: currentPage,
        pageSize: rowsPerPage === -1 ? 9999 : rowsPerPage,
        keyword: searchQuery,
      }),
    {
      keepPreviousData: true,
      onSuccess: () => {
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    }
  );

  const handlePageChange = (event, newPage) => {
    onPageChange(newPage + 1);
  };

  const handleRowsPerPageChange = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(1);
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  let users = data?.data || [];
  const { totalLength } = data?.meta_data || {};

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    users = users.filter((user) => {
      return (
        (user.name && user.name.toLowerCase().includes(query)) ||
        (user.email && user.email.toLowerCase().includes(query)) ||
        (user.mobile && user.mobile.toLowerCase().includes(query))
      );
    });
  }

  return (
    <div style={{ textAlign: "center", marginTop: "auto" }}>
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
                  >
                    {user.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <UserDetailsLink userId={user._id} />
                  <IconButton style={{ color: "#1976d2" }}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{ marginTop: "16px" }}
      >
        <Grid item>
          <Typography
            variant="body2"
            style={{ color: "black", marginLeft: "40px" }}
          >
            Total Individual Users: {totalLength}
          </Typography>
        </Grid>
        <Grid item>
          <StyledTablePagination
            component="div"
            count={totalLength}
            page={currentPage - 1}
            onPageChange={handlePageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleRowsPerPageChange}
            rowsPerPageOptions={[10, 25, { label: "All", value: -1 }]}
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
        </Grid>
      </Grid>
    </div>
  );
};

const StyledTablePagination = styled(TablePagination)(
  ({ theme }) => `
    .${tablePaginationClasses.root} {
      background-color: ${
        theme.palette.mode === "dark" ? "#424242" : "#f0f0f0"
      };
      padding: ${theme.spacing(2)}px;
      text-align: center;
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
