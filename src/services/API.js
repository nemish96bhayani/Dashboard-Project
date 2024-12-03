// API.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Authentication Services
export const AuthService = {
  hashPassword(password) {
    // In production, use a proper password hashing library
    return btoa(password); // This is just for development!
  },

  async login(email, password) {
    try {
      const hashedPassword = this.hashPassword(password);
      const response = await API.get(`/users?email=${email}`);
      const user = response.data[0];

      if (user && user.password === hashedPassword) {
        return {
          user,
          token: this.generateToken(user),
        };
      }
      throw new Error("Invalid credentials");
    } catch (error) {
      throw error;
    }
  },

  async signup(userData) {
    try {
      // Check if user already exists
      const existingUser = await API.get(`/users?email=${userData.email}`);
      if (existingUser.data.length > 0) {
        throw new Error("User already exists");
      }

      // Create new user with required fields
      const hashedPassword = this.hashPassword(userData.password);
      const newUser = {
        ...userData,
        password: hashedPassword,
        role: "user",
        status: "active",
        createdAt: new Date().toISOString(),
      };

      const response = await API.post("/users", newUser);

      if (!response.data) {
        throw new Error("Failed to create user");
      }

      return {
        user: response.data,
        token: this.generateToken(response.data),
      };
    } catch (error) {
      console.error("Signup error:", error);
      if (error.response) {
        throw new Error(error.response.data.message || "Signup failed");
      }
      throw error;
    }
  },

  generateToken(user) {
    return btoa(
      JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        timestamp: Date.now(),
      })
    );
  },

  verifyToken(token) {
    try {
      const decoded = JSON.parse(atob(token));
      // Add more robust token verification in production
      if (decoded.timestamp + 24 * 60 * 60 * 1000 < Date.now()) {
        return null; // Token expired
      }
      return decoded;
    } catch (error) {
      return null;
    }
  },
};

// User Management Services
export const UserService = {
  async getAllUsers() {
    try {
      const response = await API.get("/users");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUserById(id) {
    try {
      const response = await API.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(id, userData) {
    try {
      const response = await API.put(`/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id) {
    try {
      await API.delete(`/users/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

// Role Management Services
export const RoleService = {
  async getAllRoles() {
    try {
      const response = await API.get("/roles");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createRole(roleData) {
    try {
      const response = await API.post("/roles", roleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateRole(id, roleData) {
    try {
      const response = await API.put(`/roles/${id}`, roleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteRole(id) {
    try {
      await API.delete(`/roles/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  },
};

export default API;
