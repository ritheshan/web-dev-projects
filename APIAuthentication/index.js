import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// Set EJS as the view engine
app.set("view engine", "ejs");

// Runtime variables for API key and Bearer token
let apiKey = "";
let bearerToken = "";

// Initialize credentials
const initializeCredentials = async () => {
  try {
    // Attempt to register a new user
    try {
      const registerResponse = await axios.post(`${API_URL}/register`, {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      });
      console.log("Registration Response:", registerResponse.data);
    } catch (registerError) {
      if (registerError.response?.data?.error === "Username is already taken.") {
        console.log("Username is already taken. Proceeding with existing credentials...");
      } else {
        throw registerError; // Throw other errors
      }
    }

    // Generate API Key
    const apiKeyResponse = await axios.get(`${API_URL}/generate-api-key`, {
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
    });
    console.log("API Key Response:", apiKeyResponse.data);
    apiKey = apiKeyResponse.data.apiKey;

    // Get Bearer Token
    const tokenResponse = await axios.post(`${API_URL}/get-auth-token`, {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    });
    console.log("Bearer Token Response:", tokenResponse.data);
    bearerToken = tokenResponse.data.token;
  } catch (error) {
    console.error("Error during initialization:", error.response?.data || error.message);
  }
};


// Call initializeCredentials
initializeCredentials();

// Routes
app.get("/", (req, res) => {
  res.render("index", { content: "Select an authentication method above to see results." });
});

// No Authentication route
app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/random`);
    res.render("index", { content: JSON.stringify(result.data, null, 2) });
  } catch (error) {
    res.render("index", { content: `Error: ${error.response?.data || error.message}` });
  }
});

// Basic Authentication route
app.get("/basicAuth", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/all?page=2`, {
      auth: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      },
    });
    res.render("index", { content: JSON.stringify(result.data, null, 2) });
  } catch (error) {
    res.render("index", { content: `Error: ${error.response?.data || error.message}` });
  }
});

// API Key Authentication route
app.get("/apiKey", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/filter`, {
      params: {
        score: 5,
        apiKey: apiKey,
      },
    });
    res.render("index", { content: JSON.stringify(result.data, null, 2) });
  } catch (error) {
    res.render("index", { content: `Error: ${error.response?.data || error.message}` });
  }
});

// Bearer Token Authentication route
app.get("/bearerToken", async (req, res) => {
  try {
    const result = await axios.get(`${API_URL}/secrets/2`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    res.render("index", { content: JSON.stringify(result.data, null, 2) });
  } catch (error) {
    res.render("index", { content: `Error: ${error.response?.data || error.message}` });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
