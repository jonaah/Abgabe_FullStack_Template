// Import the pg library for PostgreSQL connections
const Pool = require('pg').Pool;

// Create a new Pool instance with connection parameters
const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  database: 'pernexample'
});

// Export the pool instance to be used in other parts of the application
module.exports = pool;