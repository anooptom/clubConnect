const express = require('express');
const cors = require('cors'); // Add this line
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Add this middleware to enable CORS
app.use(cors());

app.post('/api/signup', (req, res) => {
  console.log(req.body); // Display form data in the console
  res.json({ message: 'Sign up successful!' });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
