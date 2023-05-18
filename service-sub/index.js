const express = require('express');
const app = express();
const PORT = 3002;

app.get('/subtract/:num1/:num2', (req, res) => {
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);
  const result = num1 - num2;
  res.json({ result });
});

// Express route handler for greeting
app.get('/greeting', (req, res) => {
  res.json({ message: 'Welcome to the Subtraction service!' });
});

app.listen(PORT, () => {
  console.log(`Subtraction microservice running on port ${PORT}`);
});
