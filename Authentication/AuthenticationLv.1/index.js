import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";


const app = express();
const port = 3000;
const pool = new pg.Pool({
  user: "postgres",      // PostgreSQL username
  host: "localhost",          // Database server address
  database: "newdatabase",  // Database name
  password: "jaishriram",  // PostgreSQL password
  port: 5432,                 // PostgreSQL port (default: 5432)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", (req, res) => {
  const message = req.query.message;  // Get the message from the query params
  res.render("home.ejs", { message: message });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});



// Register Route
app.post("/register", async (req, res) => {
  const { username , password } = req.body;
  console.log(req.body);
  console.log(username);

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 indicates the rounds of hashing

    // Insert user into the database
    const query = "INSERT INTO usersAuthentication (email, password) VALUES ($1, $2) RETURNING id";
    const values = [username, hashedPassword];

    const result = await pool.query(query, values);

    console.log("User registered with ID:", result.rows[0].id);
    res.render("home.ejs", { message: "User registered successfully!" });
  } catch (err) {
    if (err.code === "23505") {
      // PostgreSQL error code for unique constraint violation
      res.render("home.ejs", { message:"Email is already registered." })
      // res.status(400).send("Email is already registered.");
    } else {
      console.error("Error during registration:", err);
      res.status(500).send("Internal server error.");
    }
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username , password } = req.body;

  try {
    // Check if the user exists in the database
    const query = "SELECT * FROM usersAuthentication WHERE email = $1";
    const values = [username];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return  res.render("home.ejs", { message: "Invalid   email" });
      // res.status(400).send("Invalid email or password.");
    }

    const user = result.rows[0];

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("home.ejs", { message: "Invalid  password." });
      // res.status(400).send("Invalid email or password.");
    }
    
      

    // If valid, send a success response
    console.log("User logged in:", user.id);
    return res.render("secrets.ejs");
     
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Internal server error.");
  }
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

