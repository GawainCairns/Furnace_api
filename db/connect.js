const pool = require('./pool');

(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log('ok');
  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
})();
