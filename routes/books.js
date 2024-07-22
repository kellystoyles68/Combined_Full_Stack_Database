//initialize
const express = require("express");
const router = express.Router();
const pool = require("../services/db");

//Get all Books
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM books`);
    res.render("books", { books: result.rows });
  } catch (err) {
    console.log("Error getting books");
    console.error(`Error retreiving books`);
    res.status(500).send("Server Error");
  }
});

// Get a specific book
router.get("/:Id", async (req, res) => {
  let bookId = req.params.Id;
  try {
    const result = await pool.query(`SELECT * FROM books WHERE ISBN = $1`, [
      req.params.Id,
    ]);
    if (result.rows.length > 0) {
      res.render("book", { book: result.rows[0] });
    } else {
      res.status(404).render("nonrecord");
    }
  } catch (error) {
    res.status(500).send(`Error retreving book`);
  }
});

// Addd a new book
router.post("/", async (req, res) => {
  const bookId = { id, title, author, genre, yearPublished };
  try {
    await pool.query(
      `INSERT INTO books (id, title, author, genre, yearPublished)
            VALUES ($1, $2, $3, $4, $5)`,
      [id, title, author, genre, yearPublished]
    );
    res.redirect("/books");
  } catch (error) {
    console.log("Error adding the book");
    res.status(500).send("Error adding a book");
  }
});

//Update a book
router.put("/", async (req, res) => {
  try {
    await pool.query(
      `UPDATE books SET author  = $1 WHERE author = $2', [newName, oldName]`
    );
    res.redirect("/books");
  } catch (error) {
    console.log("Error updating the book");
    res.status(500).send("Error updating a book");
  }
});

//Delete a book
router.delete("/id/delete", async (req, res) => {
  const bookId = req.params.id;
  try {
    await pool.query(`DELETE FROM books WHERE id = $1`, [bookId]);
    res.redirect("/books");
  } catch (error) {
    console.log("Error deleting the book");
    res.status(500).send("Error deleting a book");
  }
});

module.exports = router;
