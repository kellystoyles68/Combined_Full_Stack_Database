const pool = require("../db");

//get all books
async function getAllBooks() {
  try {
    const result = await pool.query("select title,author,genre from books");
    return result.rows;
  } catch (error) {
    console.error("Error getting the books:", error);
    //throw error;
  }
}

//add a new book
async function addBook(book) {
  const { id, title, author, genre, year_published } = book;
  try {
    await pool.query(
      "INSERT INTO books (id, title, author, genre, year_published) VALUES ($1, $2, $3, $4, $5)",
      [id, title, author, genre, year_published]
    );
  } catch (error) {
    console.error("Error adding book:", error);
    // throw error;
  }
}

//update a book field
async function updateBookField(field, newValue, title) {
  const allowedFields = ["id", "title", "author", "genre", "year_published"];
  if (!allowedFields.includes(field)) {
    throw new Error("Invalid field name");
  }
  //const query = `UPDATE books SET $1:name=  $2 WHERE title = $3`;
  // await pool.query(query, [field, newValue, title]);
}

//delete a book
async function deleteBook(title) {
  try {
    const result = await pool.query("DELETE FROM books WHERE title = $1", [
      title,
    ]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting the book:", error);
    //throw error;
  }
}

// Get a book by title
async function getBookByTitle(title) {
  try {
    const result = await pool.query("SELECT * FROM books WHERE title = $1", [
      title,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error getting the book:", error);
    //throw error;
  }
}

//get all modules
module.exports = {
  getAllBooks,
  addBook,
  updateBookField,
  deleteBook,
  getBookByTitle,
};
