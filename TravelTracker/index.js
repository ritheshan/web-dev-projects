import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "newdatabase",
  password: "jaishriram",
  port: 5432,
});

db.connect();
let results=[];






app.get("/", async (req, res) => {
  //Write your code here.
  db.query("SELECT COUNTRY_CODE FROM VISITED_COUNTRY", (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
    } else {
    
      results= res.rows;
    }
    db.end();
  });
  let countries=[];
  results.forEach(element => {
    countries.push(element.country_code);
  });
  console.log(results);
  res.render("index.ejs",{countries:countries,total:countries.length});
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


