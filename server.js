require('dotenv').config();
const pool = require('./db/pool');
require('./db/connect');

const express = require('express');

const app = express();
const startingPort = process.env.PORT ? Number(process.env.PORT) : 3000;

// server routes
app.get('/', (req, res) => {
  res.json({ message: 'Furnace API is running' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'API is healthy' });
});

// db routes
const dbRoutes = require('./routes/db');
app.use('/db', dbRoutes);



function startServer(port, attempts = 5) {
  const server = app.listen(port, () => {
    console.log(`Furnace API listening on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' && attempts > 0) {
      console.warn(`Port ${port} in use — trying ${port + 1}`);
      setTimeout(() => startServer(port + 1, attempts - 1), 200);
    } else {
      console.error('Server failed to start:', err.message);
      process.exit(1);
    }
  });
}

startServer(startingPort);

module.exports = app;
