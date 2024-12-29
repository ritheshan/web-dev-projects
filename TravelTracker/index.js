import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Use pg.Pool for connection pooling
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "newdatabase",
  password: "jaishriram",
  port: 5432,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  try {
    // Fetch data using the pool
    const result = await pool.query("SELECT country_code FROM visited_country");
    const countries = result.rows.map((row) => row.country_code);

    console.log("Fetched countries:", countries);

    // Send countries as a JSON-safe string to EJS
    res.render("index.ejs", {
      countries: JSON.stringify(countries),
      total: countries.length,
    });
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Database error");
  }
});

// POST request to add country to visited_country table
app.post("/add", async (req, res) => {
  const userInput = req.body.country.trim(); // Assuming the input field name is "country"

  try {
    // Step 1: Normalize both the input and database country names by removing spaces and converting to lowercase
    const countryResult = await pool.query(
      "SELECT country_code FROM country WHERE REPLACE(LOWER(country_name), ' ', '') = REPLACE(LOWER($1), ' ', '')",
      [userInput]
    );

    if (countryResult.rows.length === 0) {
      // Country not found
      console.log(`Country "${userInput}" not found in the country table.`);
      return res.status(404).send("Country not found.");
    }

    // Step 2: Get the ID of the country
    const countryId = countryResult.rows[0].country_code;

    // Step 3: Insert the ID into the visited_country table
    await pool.query(
      "INSERT INTO visited_country (country_code) VALUES ($1)",
      [countryId]
    );

    console.log(`Country "${userInput}" with ID ${countryId} added to visited_country.`);
    res.redirect("/"); // Redirect back to the home page or another route
  } catch (err) {
    console.error("Error handling POST request:", err);
    res.status(500).send("An error occurred.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
