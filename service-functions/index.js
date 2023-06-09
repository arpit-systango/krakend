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

// Square root operation
app.get('/sqrt/:num', (req, res) => {
  const num = parseFloat(req.params.num);
  if (isNaN(num)) {
    res.status(400).json({ error: 'Invalid number' });
  } else if (num < 0) {
    res.status(400).json({ error: 'Number must be non-negative' });
  } else {
    const result = Math.sqrt(num);
    res.json({ result });
  }
});

// Logarithm operation
app.get('/log/:num', (req, res) => {
  const num = parseFloat(req.params.num);
  if (isNaN(num)) {
    res.status(400).json({ error: 'Invalid number' });
  } else if (num <= 0) {
    res.status(400).json({ error: 'Number must be positive' });
  } else {
    const result = Math.log(num);
    res.json({ result });
  }
});

// Express route handler for greeting
app.get('/greeting', async (req, res) => {
  try {
    // Perform requests to individual services for greetings
    const authResponse = await axios.get('http://auth:3000/greeting');
    const additionResponse = await axios.get('http://addition:3001/greeting');
    const subtractionResponse = await axios.get('http://subtraction:3002/greeting');
    const multiplicationResponse = await axios.get('http://multiplication:3003/greeting');
    const divisionResponse = await axios.get('http://division:3004/greeting');

    // Combine the greeting messages
    const combinedGreeting = {
      auth: authResponse.data.message,
      addition: additionResponse.data.message,
      subtraction: subtractionResponse.data.message,
      multiplication: multiplicationResponse.data.message,
      division: divisionResponse.data.message,
    };
    // Return the combined greeting
    res.json(combinedGreeting);
  } catch (error) {
    // Handle any errors
    console.error('Error retrieving greetings:', error.message);
    res.status(500).json({ error: 'Failed to retrieve greetings' });
  }
});


app.listen(PORT, () => {
  console.log(`service-functions microservice running on port ${PORT}`);
});
