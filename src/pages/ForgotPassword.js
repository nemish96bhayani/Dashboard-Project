import React, { useState } from "react";
import { TextField, Button, Typography, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage("Password reset link sent to your email");
      setError("");
    } catch (err) {
      setError(err.message || "Failed to send reset link");
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container maxWidth="xs">
        <Paper elevation={3} className="p-6 rounded-lg">
          <Typography variant="h4" className="text-center mb-4">
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {message && (
              <Typography color="primary" className="text-center">
                {message}
              </Typography>
            )}
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
              Send Reset Link
            </Button>
            <div className="text-center mt-2">
              <Link to="/login" className="text-blue-500 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgotPassword;
