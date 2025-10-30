"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", form);
    // TODO: handle authentication logic (e.g., call API)
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <LockOutlined
            color="primary"
            sx={{
              fontSize: 50,
              backgroundColor: "primary.light",
              borderRadius: "50%",
              p: 1,
              color: "white",
            }}
          />
          <Typography variant="h5" fontWeight={600} sx={{ mt: 2 }}>
            Welcome Back
          </Typography>
          <Typography color="text.secondary">
            Sign in to continue to your account
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
            }}
          >
            Sign In
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3 }}>
          Don’t have an account?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ cursor: "pointer", fontWeight: 600 }}
            onClick={() => (window.location.href = "/register")}
          >
            Sign up
          </Typography>
        </Typography>
      </Paper>
    </Container>
  );
}
