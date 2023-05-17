const express = require('express');
const app = express();
const PORT = 3004;

app.get('/divide/:num1/:num2', (req, res) => {
  const num1 = parseFloat(req.params.num1);
  const num2 = parseFloat(req.params.num2);
  const result = num1 / num2;
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`Division microservice running on port ${PORT}`);
});
