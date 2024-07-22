"use client";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import toast from "react-hot-toast";
import "./style.css";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const login = async (formData) => {
  const response = await axios.post(
    "https://liveload-api.vercel.app/api/v1/login",
    formData
  );
  const token = response.data.result.session.token;
  localStorage.setItem("token", token);
  return response.data.result;
};

const LoginForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = new QueryClient();
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/success");
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
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
        sx={{ mb: 2, "& .MuiInputBase-input": { height: "1rem" } }}
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
        sx={{ mb: 2, "& .MuiInputBase-input": { height: "1rem" } }}
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
