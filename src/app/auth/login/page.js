"use client";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useMutation, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import toast from "react-hot-toast";
import * as yup from "yup";
import { login } from "../../api/login";
import { Typography } from "@mui/material";
import Grid from "@mui/material";
import "./style.css";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
};
const LoginForm = () => {
  const theme = useTheme();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = new QueryClient();
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
    queryClient,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    const requestData = {
      username: formData.email,
      password: formData.password,
    };
    mutation.mutate(requestData);
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ToastContainer />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              fontWeight={600}
              color={"#262626"}
              lineHeight={1.33}
              fontFamily="Public Sans"
            >
              Login To LiveLoads
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Link href={"/auth/signup"}>
              <Typography
                variant="h5"
                sx={{
                  textDecoration: "none",
                  fontSize: "14px",
                  lineHeight: 1.57,
                  fontFamily: "Public Sans",
                  fontWeight: 400,
                  color: "#3466d1",
                  cursor: "pointer",
                }}
              >
                Don&apos;t have an account?
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("email")}
              label="Email Address"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              required
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...register("password")}
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type={showPassword ? "text" : "password"}
              required
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handlePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Link href={"/auth/forgotPassword"}>
              <Typography
                variant="h5"
                sx={{
                  textDecoration: "none",
                  fontSize: "14px",
                  lineHeight: 1.57,
                  fontFamily: "Public Sans",
                  fontWeight: 600,
                  color: "#262626",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1677ff",
                color: "white",
              }}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading && (
                <div className="loading">
                  <div className="loader"></div>
                </div>
              )}
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default LoginForm;
