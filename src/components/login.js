"use client";
import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = ({ onSubmitSuccess }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const login = async (formData) => {
    try {
      setIsPending(true);
      const response = await axios.post(
        "https://liveload-api.vercel.app/api/v1/login",
        formData
      );
      const data = response.data;
      setIsPending(false);
      if (typeof onSubmitSuccess === "function") {
        onSubmitSuccess(data); // Call onSubmitSuccess if it's a function
      }
    } catch (error) {
      setIsPending(false);
      // Handle error
      console.error("Login error:", error);
    }
  };

  const onSubmit = (formData) => {
    const requestData = {
      username: formData.email,
      password: formData.password,
    };
    login(requestData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email")}
          label="Email"
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
          onClick={() => router.push("/success")}
          type="submit"
          variant="contained"
          fullWidth
          margin="normal"
          sx={{ mb: -12 }}
        >
          LogIn
        </Button>
      </form>
      {isPending && (
        <div className="overlay">
          <div className="loading"></div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
