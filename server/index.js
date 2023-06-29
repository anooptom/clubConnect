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

app.get('/getevents', async (req, res) => {
  try {
    await client.connect();
    const collectione= client.db("dataBase").collection("events");
    
    const events = await collectione.find({club: req.query.club ,completed: "no"}).toArray();
    const cevents = await collectione.find({club: req.query.club ,completed: "yes"}).toArray();
    res.json({e:events , ce: cevents })

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/getrevents', async (req, res) => {
  try {
    await client.connect();
    const collectione= client.db("dataBase").collection("events");
    const stud = { sname: req.query.nme, suid: req.query.uid };
    const events = await collectione.find({
      club: req.query.club,
      "students.sname" : stud.sname,
      "students.suid" : stud.suid
    }).toArray();

    res.json(events)
    

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/fetchstd', async (req, res) => {
  try {
    await client.connect();
    const collectionf= client.db("dataBase").collection("faculty");
    const collections= client.db("dataBase").collection("students");
    
    const fac = await collectionf.findOne({name : req.query.name});
    const stds = await collections.find({club : fac.club}).toArray();
    const datas = {
      info:stds,
      c : fac.club,
    };
    res.json(datas);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } 
});

app.get('/fetchclub', async (req, res) => {
  try {
    await client.connect();
    const collectionf= client.db("dataBase").collection("club");
    
    const clubs = await collectionf.find({}).toArray();
    res.json(clubs)

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
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


app.get('/fetchd', async (req, res) => {
  try {
    await client.connect();
    const collections= client.db("dataBase").collection("students");
    
    const std = await collections.find({uid : req.query.uid}).toArray();
    res.json(std);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
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

app.post('/markcomp', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("events");
    if(req.body.op =="comp")
      await collection1.updateOne({name:req.body.data , club : req.body.club},{$set:{completed : "yes"}});
    else
    await collection1.deleteOne({name: req.body.data, club : req.body.club});
    res.json({ message: '1' });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  } finally {
    await client.close();
  }
});

app.post('/reg', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("events");
    const stud = {sname:req.body.nme ,suid: req.body.uid}
    
    const e = await collection1.findOne({ name: req.body.data.name,club : req.body.club})

    if(e && e.students && e.students.some(student => student.sname === req.body.nme && student.suid === req.body.uid)){
      res.json({message : "0"})
    }

    else{
      await collection1.updateOne(
        { name: req.body.data.name,club : req.body.club},
        {$addToSet : {students : stud}}
      )
      res.json({message : "1"})

    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/eventcreate', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("events");
    
    const existingevents = await collection1.findOne({ name: req.body.data.name,club : req.body.club});
    if(existingevents){
      res.json({ message: '0' });
    }
    else{
      await collection1.insertOne({ name: req.body.data.name,des: req.body.data.des , date :req.body.data.date , club :req.body.club,completed : "no" });
      res.json({ message: '1' });
    }


  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
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
        res.json({ message: '1' ,name : existingUser.name});
      }
      else{
        res.json({message:'0'})
      }
    } else {
      res.json({ message: '-1'  });
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
