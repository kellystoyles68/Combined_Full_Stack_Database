const request = require("supertest");
const express = require("express");
const { Pool } = require("pg");
const booksRouter = require("../routes/books.js");
const { updateBookField } = require("../services/sql/books.dal.js");
const { addBook } = require("../services/sql/books.dal.js");

// Mock the database connection
jest.mock("pg", () => {
  const mPool = {
    connect: jest.fn(),
    query: jest.fn(),
    on: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const app = express();
app.use(express.json());
//app.use("/", indexRouter);
app.use("/books", booksRouter);

//test1 - i want to see if i can get a list of all my books in the library
describe("GET /books", () => {
  it("should list all books", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValue({
      rows: [
        { id: 1, title: "Book 1", author: "Author 1" },
        { id: 2, title: "Book 2", author: "Author 2" },
      ],
    });

    const res = await request(app).get("/books");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      { id: 1, title: "Book 1", author: "Author 1" },
      { id: 2, title: "Book 2", author: "Author 2" },
    ]);
  });
});

// test2 - checks to see if ayou can updatee any book field
test("should update a book field", async () => {
  const field = "title";
  const newValue = "Updated Title";
  const title = Book 1;

  const pool = new Pool();
  pool.query.mockResolvedValue({ rowCount: 1 });

  await updateBookField(field, newValue, title);

  expect(pool.query).toHaveBeenCalledWith(
    `UPDATE books SET ${field} = $1 WHERE id = $2`,
    [newValue, title]
  );
});

//Test3: i want to see if i can delete a book from the library

describe("DELETE /books/:title", () => {
  it("should delete a book from the database", async () => {
    const pool = new Pool();
    pool.query.mockResolvedValue({ rowCount: 1 });

    const res = await request(app).delete("/books/Book 1");

    expect(res.statusCode).toEqual(200);
    expect(pool.query).toHaveBeenCalledWith("DELETE FROM books WHERE title = $1", [
      1,
    ]);
  });
});

//test4 - i want to see if the page will allow me to add a new book to the database

test("should add a new book to the database", async () => {
  const newBook = {
    id: 1234567890123,
    title: "Test Book",
    author: "Test Author",
    genre: "Test Genre",
    year_published: 2023,
  };
  const pool = new Pool();
  pool.query.mockResolvedValue({ rowCount: 1, rows: [newBook] });

  // Add the book to the database
  await addBook(newBook);

  // Verify the book was added

  const result = await pool.query("SELECT * FROM books WHERE id = $1", [
    newBook.id,
  ]);
  const addedBook = result.rows[0];

  expect(addedBook).toBeDefined();
  expect(addedBook.title).toBe(newBook.title);
  expect(addedBook.author).toBe(newBook.author);
  expect(addedBook.genre).toBe(newBook.genre);
  expect(addedBook.year_published).toBe(newBook.year_published);
});
