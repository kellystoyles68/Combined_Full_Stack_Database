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

//** I am hardcoding my database becuase for some reason (which i can't figure out)
//Node.js codes my host as "base".
//this is the only solution i have as the above commented out code did console to the terminal that the connection was made

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "MyLibraryFlorida",
  password: "KeyinCollege",
  port: 5433,
});

pool
  .connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection error:", err));

module.exports = pool;
