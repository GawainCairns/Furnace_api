const express = require('express');
const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.json({ message: 'Furnace API is running' });
});

app.listen(port, () => {
  console.log(`Furnace API listening on port ${port}`);
});
