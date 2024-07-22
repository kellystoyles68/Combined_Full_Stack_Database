const pool = require("../db");

//get all books
async function getAllBooks() {
  try {
    const result = await pool.query("SELECT * FROM books");
    return result.rows;
  } catch (error) {
    console.error("Error getting the books:", error);
    throw error;
  }
}

//get a book by ID
//async function getBookById(id) {
// const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
// return result.rows[0];
//}

//add a new book
async function addBook(book) {
  const { id, title, author, genre, year_published } = book;
  await pool.query(
    "INSERT INTO books (id, title, author, genre, year_published) VALUES ($1, $2, $3, $4, $5)",
    [id, title, author, genre, year_published]
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
  try {
    const result = await pool.query("DELETE FROM books WHERE id = $1", [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error deleting the book:", error);
    throw error;
  }
}

//get the number of books
async function getNumberOfBooks() {
  const result = await pool.query("SELECT COUNT(*) FROM books");
  return result.rows[0].count;
}

//get all modules
module.exports = {
  getAllBooks,
  addBook,
  updateAuthor,
  deleteBook,
  getNumberOfBooks,
  // getBookById,
};
