//initialize
const express = require("express");
const router = express.Router();
const pool = require("../services/db");
const { deleteBook } = require("../services/sql/books.dal.js");
const { getAllBooks } = require("../services/sql/books.dal.js");

//Get all Books
router.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error getting books", error);
    res.status(500).json({ error: "Internal Server Error" });
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
router.delete("/id", async (req, res) => {
  const { id } = req.params;
  try {
    const success = await deleteBook(id);
    if (success) {
      res.status(200).send({ message: " Book was deleted." });
    } else {
      res.status(404).send({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
