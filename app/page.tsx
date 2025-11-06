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
  Tooltip,
  Alert,
} from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginService } from "@/lib/apiService";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginService(form.email, form.password);
      router.push("/products");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
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
        elevation={8}
        sx={{
          p: 5,
          borderRadius: 4,
          width: "80%",
          textAlign: "center",
          backdropFilter: "blur(6px)",
        }}
      >
        {/* Logo Section */}
        <Box sx={{ mb: 3 }}>
          <Image
            src="/logo.png"
            alt="App logo"
            width={90}
            height={90}
            style={{ borderRadius: "12px" }}
          />
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ mt: 2, letterSpacing: 0.5 }}
          >
            SLA Admin Portal
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Please sign in to continue
          </Typography>
        </Box>

        {/* Error Message */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
              textAlign: "left",
              fontSize: "0.95rem",
            }}
          >
            {error}
          </Alert>
        )}

        {/* Form Section */}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
            type="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip
                    title={showPassword ? "Hide Password" : "Show Password"}
                  >
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            startIcon={<LockOutlined />}
            sx={{
              mt: 3,
              py: 1.4,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              boxShadow: 3,
            }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
