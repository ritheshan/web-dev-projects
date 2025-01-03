import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const pool = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "newdatabase",
  password: "jaishriram",
  port: 5432,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [];

app.get("/", async (req, res) => {
  try {
    // Query to fetch all items from the database
    const result = await pool.query("SELECT * FROM items");

    // Pass the retrieved items to the EJS template
    res.render("index.ejs", {
      listTitle: "Today",         // Title of the list
      listItems: result.rows,    // All items fetched from the database
    });
  } catch (err) {
    console.error("Error fetching items from the database:", err.stack);
    res.status(500).send("Error retrieving items.");
  }
});


// add post  method
app.post("/add", async (req, res) => {
  const newItem = req.body.newItem.trim(); // Extract and trim the new item title

  if (!newItem) {
    // Ensure the item title is not empty
    console.error("Item title cannot be empty.");
    return res.status(400).send("Item title cannot be empty.");
  }

  try {
    // Insert the new item into the database
    await pool.query("INSERT INTO items (title) VALUES ($1)", [newItem]);

    console.log(`New item added: "${newItem}"`);
    res.redirect("/"); // Redirect to the home page to display the updated list
  } catch (err) {
    console.error("Error adding new item to the database:", err.stack);
    res.status(500).send("Error adding new item.");
  }
});


// edit post method
app.post("/edit", async (req, res) => {
  const updatedItemId = req.body.updatedItemId; // Extract the ID of the item to update
  const updatedItemTitle = req.body.updatedItemTitle.trim(); // Extract the new title

  if (!updatedItemTitle) {
    // Ensure the new title is not empty
    console.error("Title cannot be empty.");
    return res.status(400).send("Title cannot be empty.");
  }

  try {
    // Update the item's title in the database
    const result = await pool.query(
      "UPDATE items SET title = $1 WHERE id = $2",
      [updatedItemTitle, updatedItemId]
    );

    if (result.rowCount === 0) {
      console.error(`No item found with ID: ${updatedItemId}`);
    } else {
      console.log(`Item with ID ${updatedItemId} updated successfully.`);
    }

    // Redirect to the home page to display the updated list
    res.redirect("/");
  } catch (err) {
    console.error("Error updating item in the database:", err.stack);
    res.status(500).send("Error updating item.");
  }
});

// delete post method
app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId; // Extract the ID from the request body

  try {
    // Delete the item from the database
    const result = await pool.query("DELETE FROM items WHERE id = $1", [itemId]);

    if (result.rowCount === 0) {
      console.error(`No item found with ID: ${itemId}`);
    } else {
      console.log(`Item with ID ${itemId} deleted successfully.`);
    }

    // Redirect to the home page
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting item from the database:", err.stack);
    res.status(500).send("Error deleting item.");
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
