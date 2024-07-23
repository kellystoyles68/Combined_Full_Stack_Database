//initialize
const express = require("express");
const router = express.Router();
const pool = require("../services/db");
const { deleteBook } = require("../services/sql/books.dal.js");
const { getAllBooks } = require("../services/sql/books.dal.js");
const { updateAuthor } = require("../services/sql/books.dal.js");
const { addBook } = require("../services/sql/books.dal.js");

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
router.get("/:title", async (req, res) => {
  let bookId = req.params.Id;
  try {
    const result = await pool.query(`SELECT * FROM books WHERE title = $1`, [
      req.params.title,
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
  //  const { id, title, author, genre, yearPublished } = req.body;
  try {
    //   await pool.query(
    //     `INSERT INTO books (id, title, author, genre, year_published)
    //           VALUES ($1, $2, $3, $4, $5)`,
    //     [id, title, author, genre, yearPublished]
    //   );
    //   res.redirect("/books");
    // } catch (error) {
    //   console.log("Error adding the book");
    //   res.status(500).send("Error adding a book");
    //  }
    //});try {
    await addBook(req.body);
    res.redirect("/books");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send("Internal Server Error");
  }
});

//Update a book
router.put("/title", async (req, res) => {
  try {
    const { field, newValue, title } = req.body;
    //await pool.query(`UPDATE books SET title = $1 WHERE title = $2`, [
    // newName,
    //  oldName,
    //]);
    await updateBookField(field, newValue, title);
    res.redirect("/books");
  } catch (error) {
    console.log("Error updating the book");
    res.status(500).send("Error updating a book");
  }
});

//Delete a book
//router.delete("/:title", async (req, res) => {
// const { title } = req.params;
// try {
//  const success = await deleteBook(title);
//   if (success) {
//     res.status(200).send({ message: "Book was deleted." });
//   } else {
//      res.status(404).send({ message: "Book not found" });
//    }
//  } catch (error) {
//   console.error("Error deleting the book", error);
//   res.status(500).send({ message: "Internal Server Error" });
//  }
//});

router.delete("/title", async (req, res) => {
  try {
    await deleteBook(req.body.title);
    res.redirect("/books");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
