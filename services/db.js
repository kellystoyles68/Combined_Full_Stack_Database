const { Pool } = require("pg");

//const connectionString = process.env.DATABASE_URL;

//if (!connectionString) {
// console.error("DATABASE_URL environment variable is not set.");
//  process.exit(1); // Exit the application with an error code
//}

//console.log("Connecting to database with connection string:", connectionString);

//const pool = new Pool({
//  connectionString: connectionString,
//});
const pool = new Pool({
  user: "postgres", // Replace with your actual database username
  host: "localhost", // Explicitly set the hostname to localhost
  database: "MyLibraryFlorida", // Replace with your actual database name
  password: "KeyinCollege", // Replace with your actual database password
  port: 5433, // Replace with your actual database port if different
});
pool
  .connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));
module.exports = pool;
