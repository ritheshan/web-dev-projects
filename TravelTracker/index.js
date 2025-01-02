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

let currentUserId = 1;
let users = [];

async function checkVisisted() {
  // Fetch data using the pool
  const result = await pool.query(
    "SELECT country_code FROM visited_countries JOIN users ON users.id = user_id WHERE user_id = $1; ",
    [currentUserId]
  );
  const countries = result.rows.map((row) => row.country_code);

  console.log("Fetched countries:", countries);

  // Send countries as a JSON-safe string to EJS
  return countries;
}
async function getCurrentUser() {
  const result = await pool.query("SELECT * FROM users");
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  try {
    // Fetch data using the pool
    
    const countries = await checkVisisted();
    const currentUser = await getCurrentUser();

    console.log("Fetched countries:", countries);

    // Send countries as a JSON-safe string to EJS
    res.render("index.ejs", {
      countries: JSON.stringify(countries),
      total: countries.length,
      users: users,
      color: currentUser.color,
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
    const result = await pool.query(
      "SELECT country_code FROM country WHERE REPLACE(LOWER(country_name), ' ', '') = REPLACE(LOWER($1), ' ', '')",
      [userInput]
    );

    if (result.rows.length === 0) {
      // Country not found
      console.log(`Country "${userInput}" not found in the country table.`);
       const countries = await checkVisisted();
       
      return res.render("index.ejs", {
        countries: JSON.stringify(countries), 
        total: countries.length,
        error: "Country name does not exist, try again.",
      });
    }
    

    // Step 2: Get the ID of the country
    const countryId = result.rows[0].country_code;

    // Step 3: Insert the ID into the visited_country table
    try {
      await pool.query(
        "INSERT INTO visited_countries (user_id, country_code) VALUES ($1, $2)",
        [currentUserId, countryId]
      );
      
    console.log(`Country "${userInput}" with ID ${countryId} added to visited_countries.`);
    res.redirect("/"); // Redirect back to the home page or another route
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    return res.render("index.ejs", {
      countries: JSON.stringify(countries), 
      total: countries.length,
      error: "Country has already been added, try again.",
    });
  }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    return res.render("index.ejs", {
      countries: JSON.stringify(countries), 
      total: countries.length,
      error: "Country name does not exist, try again.",
    });
  }
});

app.post("/user", async (req, res) => {

  if (req.body.add === "new") {
    res.render("new.ejs");
  } else {
    currentUserId = req.body.user;
    res.redirect("/");
  }
});

app.post("/new", async (req, res) => {
  const name = req.body.name; 
  const color = req.body.color;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, color) VALUES ($1, $2) RETURNING id",
      [name, color]
    );
    const data = result.rows[0];
    const userId = data.id;
    currentUserId = userId;
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }


  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html

});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
