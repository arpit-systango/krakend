const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

// Set the API endpoint
app.get('/fake-api/:location', (req, res) => {
  for (const header in req.headers) {
    console.log(`${header}: ${req.headers[header]}`);
  }
  const location = req.params.location;
  const filePath = path.join(__dirname, 'data', `${location}.json`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'Data not found' });
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      res.status(500).json({ error: 'Error parsing data' });
    }
  });
});

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
