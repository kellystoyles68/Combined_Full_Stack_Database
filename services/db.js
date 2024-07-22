const { Pool } = require("pg");

const { Pool } = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://username:password@localhost:5432/myfloridalibrary",
});

module.exports = pool;
