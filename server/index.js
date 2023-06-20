const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const url = "mongodb+srv://admi:Password@activity.5hkevpu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

app.use(bodyParser.json());
app.use(cors());

//faculty display
app.get('/facultydisplay', async (req, res) => {
  try {
    await client.connect();
    const collectionf= client.db("dataBase").collection("faculty");
    
    const facultyv = await collectionf.find({}).toArray();
    res.json(facultyv)

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});

app.get('/userdisplay', async (req, res) => {
  try {
    await client.connect();
    const collections= client.db("dataBase").collection("students");
    
    const userv = await collections.find({}).toArray();
    res.json(userv);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});

app.get('/clubdisplay', async (req, res) => {
  try {
    await client.connect();
    const collectionc= client.db("dataBase").collection("club");
    
    const clb = await collectionc.find({}).toArray();
    res.json(clb);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});

app.get('/data',async(req,res) =>{
  try{
    await client.connect();
    const collection1 = client.db("dataBase").collection("club");
    const collection2 = client.db("dataBase").collection("students");
    const collection3 = client.db("dataBase").collection("events");
    const collection4 = client.db("dataBase").collection("faculty");

    const Noe =await collection3.countDocuments({});
    const Nos =await collection2.countDocuments({});
    const Nof =await collection4.countDocuments({});
    const Noc =await collection1.countDocuments({});

    const data ={
      noe : Noe,
      nof : Nof,
      noc : Noc,
      nos : Nos
    }
    res.json(data);
  }
  catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } 

});

app.post('/signup', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("students");
    
    const existingUser = await collection.findOne({ uid : req.body.uid });
    if (existingUser) {
      res.json({ message: '0' });
    } else {
      await collection.insertOne({ name: req.body.name, pass: req.body.password , uid : req.body.uid , club : req.body.club });
      res.json({ message: '1' });
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } 
});

app.post('/admin', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("admin");
    
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

app.post('/clubCreate', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("club");
    const collection1 = client.db("dataBase").collection("faculty");
    
    const existingclub = await collection.findOne({ name: req.body.nme });
    const faculty = await collection1.findOne({Email : req.body.head})

    if (existingclub) {
        res.json({ message: '0' });
      }
    
    else if(!faculty){
        res.json({message:'2'})
      }
    else{  
      await collection.insertOne({ name: req.body.nme, head: req.body.head });
      await collection1.updateOne({Email : req.body.head},{$set:{club : req.body.nme}});
      res.json({ message: '1' });
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});

app.post('/clubDelete', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("club");
    
    const existingclub = await collection.findOne({ name: req.body.nme });

    if (existingclub) {
        await collection.deleteOne({name: req.body.nme});
        res.json({message :'1'})
      }
    
    else{
        res.json({message:'0'})
      }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});

app.post('/facultyDelete', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("faculty");
    
    const existing = await collection.findOne({ Email : req.body.Email });

    if (existing) {
        await collection.deleteOne({Email : req.body.Email});
        res.json({message :'1'})
      }
    
    else{
        res.json({message:'0'})
      }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});

app.post('/user', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("students");
    
    const existingUser = await collection.findOne({ uid: req.body.uid });
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

app.post('/facultyCreate', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("faculty");
    
    const existingUser = await collection.findOne({ Email : req.body.Email });
    if (existingUser) 
      {
        res.json({ message: '0' });
      }
      else{
        await collection.insertOne({ name: req.body.Fname, Email : req.body.Email , Pass: req.body.Pass ,club : 'null' });
        res.json({ message: '1' });
      }
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});

app.post('/faculty', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("faculty");
    
    const existingUser = await collection.findOne({ Email : req.body.Email });
    if (existingUser) {
      if(req.body.Pass === existingUser.Pass){
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
