const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admi:Password@activity.5hkevpu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

app.use(bodyParser.json());
app.use(cors());

app.post('/api/signup', async (req, res) => {
    
          await client.connect();
          const db = client.db("dataBase");
          const collection = db.collection("students");
          const result = await collection.insertOne({name:req.body.name,pass:req.body.password});
          console.log("Document inserted:", result.insertedId);
      
          await client.close();
          console.log("Connection closed");
    
  res.json({ message: 'Sign up successful!' });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
