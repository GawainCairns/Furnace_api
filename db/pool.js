const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.HOST || 'localhost',
  user: process.env.DB_USER || process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DATABASE || '',

  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;