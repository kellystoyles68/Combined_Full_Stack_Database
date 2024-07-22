import { Pool } from ('pg');

const pool = new Pool ({
    connectionString: process.env.DATABASW_URL ||'postgresql://username:password@localhost:5432/myfloridalibrary'
});

module.exports = pool;

