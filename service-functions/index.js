const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3005;

// Function to call the addition microservice
const performAddition = async (num1, num2) => {
  const response = await axios.get(`http://addition:3001/add/${num1}/${num2}`);
  return response.data.result;
};

// Function to call the subtraction microservice
const performSubtraction = async (num1, num2) => {
  const response = await axios.get(`http://subtraction:3002/subtract/${num1}/${num2}`);
  return response.data.result;
};

// Function to call the multiplication microservice
const performMultiplication = async (num1, num2) => {
  const response = await axios.get(`http://multiplication:3003/multiply/${num1}/${num2}`);
  return response.data.result;
};

// Function to call the division microservice
const performDivision = async (num1, num2) => {
  const response = await axios.get(`http://division:3004/divide/${num1}/${num2}`);
  return response.data.result;
};

// Percentage operation
const calculatePercentage = async (num, percentage) => {
  const result = await performMultiplication(num, percentage);
  return await performDivision(result, 100);
};

app.get('/percentage/:num/:percentage', async (req, res) => {
  const num = parseFloat(req.params.num);
  const percentage = parseFloat(req.params.percentage);

  const result = await calculatePercentage(num, percentage);
  res.json({ result });
});

app.listen(PORT, () => {
  console.log(`service-functions microservice running on port ${PORT}`);
});
