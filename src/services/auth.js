import axios from "axios";

const API_URL = "http://your-backend-api-url/auth";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Login failed");
  }
};

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Signup failed");
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("Password reset failed");
  }
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  // You might want to add more sophisticated token validation
  return !!token;
};

export const logout = () => {
  localStorage.removeItem("token");
  // Redirect to login page or perform other logout actions
};
