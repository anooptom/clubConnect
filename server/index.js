const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://admi:Password@activity.5hkevpu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

app.use(bodyParser.json());
app.use(cors());

app.post('/signup', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("students");
    
    const existingUser = await collection.findOne({ name: req.body.name });
    if (existingUser) {
      res.json({ message: 'User already exists' });
    } else {
      await collection.insertOne({ name: req.body.name, pass: req.body.password });
      res.json({ message: 'Sign up successful!' });
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});

app.post('/login', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("students");
    
    const existingUser = await collection.findOne({ name: req.body.name });
    if (existingUser) {
      if(req.body.password === existingUser.pass){
        res.json({ message: '1' });
      }
      else{
        res.json({message:'0'})
      }
    } else {
      res.json({ message: '-1' });
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
