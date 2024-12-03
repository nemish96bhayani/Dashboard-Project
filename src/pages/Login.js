import React, { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      // Assuming login returns a user token or user object
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container maxWidth="xs">
        <Paper elevation={3} className="p-6 rounded-lg">
          <Typography variant="h4" className="text-center mb-4">
            Login
          </Typography>
          <form onSubmit={handleLogin} className="space-y-4">
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" className="text-center">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Login
            </Button>
            <div className="text-center mt-2">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-2">
              <Typography>
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </Typography>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
