//this is the initial setup required for the full stack/database QAP

//initialize all our modules that were installed
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const booksRouter = require("./routes/books");

const { getAllBooks } = require("./services/sql/books.dal.js");
const {
  addBook,
  updateBookField,
  deleteBook,
} = require("./services/sql/books.dal.js");

//port configuration
const PORT = 3000;

//express initialization
const app = express();

//set the views & layouts
app.set("view engine", "ejs");
//app.set("views", __dirname + "/views");

//set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
//app.use(express.static(__dirname, "public"));
app.use(methodOverride("_method"));
app.use("/books", booksRouter);

//set up routes for the app
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

//Route to get a list of books
app.get("/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.render("books", { books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Internal Server Error");
  }
});
//Routes to get the forms
app.get("/books/new", (req, res) => {
  res.render("create");
});

app.get("/books/update", (req, res) => {
  res.render("update");
});

app.get("/books/delete", (req, res) => {
  res.render("delete");
});

// Route to handle the form submission for adding a new book
app.post("/books", async (req, res) => {
  try {
    await addBook(req.body);
    res.redirect("/books");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for  updating a book
//app.put("/books/title", async (req, res) => {
//  try {
//    const book = await getBookByTitle(req.body.title);
//    if (book) {
//      res.render("update", { book });
//    } else {
//     res.render("norecord");
////    }
//  } catch (error) {
//   console.error("Error fetching book:", error);
//   res.status(500).send("Internal Server Error");
// }
//});
app.put("/books/title", async (req, res) => {
  try {
    const { field, newValue, title } = req.body;
    await updateBookField(field, newValue, title);
    res.redirect("/books");
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route for deleting a book
app.delete("/books/title", async (req, res) => {
  try {
    await deleteBook(req.body.title);
    res.redirect("/books");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send("Internal Server Error");
  }
});

//check to see if the server is listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
