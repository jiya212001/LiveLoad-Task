"use client";
import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation, QueryClient, QueryClientProvider } from "react-query";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoginForm queryClient={queryClient} />
    </QueryClientProvider>
  );
};

const LoginForm = ({ queryClient }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const login = async (formData) => {
    const response = await axios.post(
      "https://liveload-api.vercel.app/api/v1/login",
      formData
    );
    return response.data;
  };

  const mutation = useMutation(login, {
    onSuccess: (data) => {
      router.push("/success");
    },
    onError: (error) => {
      toast.error(error?.response?.data);
    },
    queryClient,
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
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
        type="submit"
        variant="contained"
        fullWidth
        margin="normal"
        sx={{ mb: -12 }}
        disabled={mutation.isLoading}
      >
        LogIn
      </Button>
    </form>
  );
};

export default App;
