import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import session from "express-session";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: true }));

function passwordCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "ILoveProgramming") {
    req.userIsAuthorised = true;
  }
  next();
}
app.use(passwordCheck);
app.use(
  session({
    secret: "yourSecretKey", // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 100 }, // Session lasts for 1 minute
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (req.userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
    //Alternatively res.redirect("/");
  }
});
app.get("/secret", (req, res) => {
  if (req.session.userIsAuthorised) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.redirect("/"); // Redirect to login if not authorized
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
