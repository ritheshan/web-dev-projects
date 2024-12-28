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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  try {
    // Fetch data using the pool
    const result = await pool.query("SELECT country_code FROM visited_country");
    const countries = result.rows.map((row) => row.country_code);

    console.log(result.rows);
    res.render("index.ejs", { countries: countries, total: countries.length });
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Database error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
