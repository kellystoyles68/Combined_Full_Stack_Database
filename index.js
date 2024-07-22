//this is the initial aetup required for the full stack/database QAP

//initialize all our modules that were installed
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const booksRouter = require("./routes/books");
const { getAllBooks } = require("./services/sql/books.dal.js");

//port configuration
const PORT = 3000;

//express initialization
const app = express();

//set the views & layouts
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

//set up routes for the app
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

//app.get("/books", booksRouter);
app.get("/books", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.render("books", { books });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send("Internal Server Error");
  }
});

//check to see if the server is listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
