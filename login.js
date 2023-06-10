const express = require('express')
const bodyParser = require('body-parser');


const app = express();

app.use('/', bodyParser.json());

app.post('/', (req, res) => {
    const { user, pass } = req.body;
    console.log('User:', user);
    console.log('Password:', pass);
    // Handle the data and send a response back to the frontend
    res.json({ message: 'Data received successfully' });
  });
  
  console.log('Server is starting...');
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });