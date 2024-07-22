const pool = require("../db");

//get all books
async function getAllBooks() {
  const result = await pool.query("SELECT * FROM books");
  return result.rows;
}

//get a book by ID
async function getBookById(id) {
  const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
}

//add a new book
async function addBook(id, title, author, genre, year) {
  await pool.query(
    "INSERT INTO books (id, title, author, genre, year) VALUES ($1, $2, $3, $4, $5)",
    [id, title, author, genre, year]
  );
}

//update the author's name
async function updateAuthor(oldName, newName) {
  await pool.query("UPDATE books SET author = $1 WHERE author = $2", [
    newName,
    oldName,
  ]);
}

//delete a book
async function deleteBook(id) {
  await pool.query("DELETE FROM books WHERE id = $1", [id]);
}

//get the number of books
async function getNumberOfBooks() {
  const result = await pool.query("SELECT COUNT(*) FROM books");
  return result.rows[0].count;
}

//get all modules
modules.exports = {
  getAllBooks,
  addBook,
  updateAuthor,
  deleteBook,
  getNumberOfBooks,
};
