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
        <Typography
          variant="h3"
          fontWeight={600}
          color={"#262626"}
          lineHeight={1.33}
          fontFamily="Public Sans"
          sx={{
            position: "absolute",
            top: "350px",
            left: "709px",
            fontSize: "24px",
            zIndex: 10,
            "@media (max-width: 344px)": {
              fontSize: "1.24rem",
              top: "100px",
              left: "200px",
            },
          }}
        >
          Login To LiveLoads
        </Typography>
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
              position: "absolute",
              top: "360px",
              right: "710px",
              zIndex: 10,
              "@media (max-width: 468px)": {
                fontSize: "0.875rem",
                top: "calc(60px + 28px)",
                right: "calc(17px + 22px)",
              },
            }}
          >
            Don&apos;t have an account?
          </Typography>
        </Link>

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
          sx={{
            mb: 2,
            "& .MuiInputBase-input": { height: "1rem" },
            zIndex: 10,
          }}
        />

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
          sx={{
            mb: 2,
            "& .MuiInputBase-input": { height: "1rem" },
            zIndex: 10,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handlePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
              position: "absolute",
              bottom: "400px",
              right: "710px",
              zIndex: 10,
            }}
          >
            Forgot Password?
          </Typography>
        </Link>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          margin="normal"
          sx={{
            mb: -12,
            backgroundColor: "#1677ff",
            color: "white",
            position: "relative",
            zIndex: 10,
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
      </form>
    </>
  );
};

const LoginPage = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm />
    </QueryClientProvider>
  );
};

export default LoginPage;
