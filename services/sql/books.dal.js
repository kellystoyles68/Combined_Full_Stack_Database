const pool = require("../db");

//get all books
async function getAllBooks() {
  try {
    const result = await pool.query("select title,author,genre from books");
    return result.rows;
  } catch (error) {
    console.error("Error getting the books:", error);
    throw error;
  }
}

//add a new book
async function addBook(book) {
  const { id, title, author, genre, year_published } = book;
  await pool.query(
    "INSERT INTO books (id, title, author, genre, year_published) VALUES ($1, $2, $3, $4, $5)",
    [id, title, author, genre, year_published]
  );
}

//update a book field
async function updateBookField(field, newValue, id) {
  const allowedFields = ["title", "author", "genre", "year_published"];
  if (!allowedFields.includes(field)) {
    throw new Error("Invalid field name");
  }
  const query = `UPDATE books SET ${field} = $1 WHERE id = $2`;
  await pool.query(query, [newValue, id]);
}

//delete a book
async function deleteBook(id) {
  try {
    const result = await pool.query("DELETE FROM books WHERE id = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting the book:", error);
    throw error;
  }
}

//get all modules
module.exports = {
  getAllBooks,
  addBook,
  updateBookField,
  deleteBook,
};
