//this is the initial aetup required for the full stack/database QAP

//initialize all our modules that were installed
require(`dotenv`).config();
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
//const router = express router;
const booksRouter = require("./routes/books");

//express initialization
const app = express();
//port configuration
const PORT = process.env.PORT || 3000;

//set the views & layouts
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

//set up middleware
app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

//set up routes for the app
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/books", booksRouter);

//check to see if the server is listening
app.listen(PORT, () => {
  console.log(`Server is running on port $(PORT)`);
});
