const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const enc = require('./encrypt');
const moment = require('moment');



const url = "mongodb+srv://admi:Password@activity.5hkevpu.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

app.use(bodyParser.json());
app.use(cors());

//faculty display
app.get('/facultydisplay', async (req, res) => {
  try {
    await client.connect();
    const collectionf = client.db("dataBase").collection("faculty");

    const facultyv = await collectionf.find({}).toArray();
    res.json(facultyv)

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/getevents', async (req, res) => {
  try {
    await client.connect();
    const collectione = client.db("dataBase").collection("events");

    const events = await collectione.find({ club: req.query.club, completed: "no" }).toArray();
    const cevents = await collectione.find({ club: req.query.club, completed: "yes" }).toArray();
    res.json({ e: events, ce: cevents })

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/getrevents', async (req, res) => {
  try {
    await client.connect();
    const collectione = client.db("dataBase").collection("events");
    const stud = { sname: req.query.nme, suid: req.query.uid };
    const events = await collectione.find({
      club: req.query.club,
      completed: "no",
      "students.sname": stud.sname,
      "students.suid": stud.suid
    }).toArray();

    res.json(events)


  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/getcevents', async (req, res) => {
  try {
    await client.connect();
    const collectione = client.db("dataBase").collection("events");
    const stud = { sname: req.query.nme, suid: req.query.uid };
    const events = await collectione.find({
      club: req.query.club,
      completed: "yes",
      "students.sname": stud.sname,
      "students.suid": stud.suid
    }).toArray();

    res.json(events)


  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/getnotice', async (req, res) => {
  try {
    await client.connect();
    const collectione = client.db("dataBase").collection("notice");
    const notice = await collectione.find({ club: req.query.club }).toArray();

    res.json(notice)


  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/fetchstd', async (req, res) => {
  try {
    await client.connect();
    const collectionf = client.db("dataBase").collection("faculty");
    const collections = client.db("dataBase").collection("students");

    const fac = await collectionf.findOne({ name: req.query.name });
    const stds = await collections.find({ club: fac.club }).toArray();
    const datas = {
      info: stds,
      c: fac.club,
    };
    res.json(datas);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/fetchsugg', async (req, res) => {
  try {
    await client.connect();
    const collectionf = client.db("dataBase").collection("feedbacks");
    const sugg = await collectionf.find({ club: req.query.name }).toArray();
    res.json(sugg);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/fetchnotif', async (req, res) => {
  try {
    await client.connect();
    const collectionf = client.db("dataBase").collection("faculty");
    const collections = client.db("dataBase").collection("students");

    const fac = await collectionf.findOne({ name: req.query.name });
    const stds = await collections.find({ club: fac.club, vaild: "no" }).toArray();
    res.json(stds);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/fetchclub', async (req, res) => {
  try {
    await client.connect();
    const collectionf = client.db("dataBase").collection("club");

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
    const collections = client.db("dataBase").collection("students");

    const userv = await collections.find({}).toArray();
    res.json(userv);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/clubdisplay', async (req, res) => {
  try {
    await client.connect();
    const collectionc = client.db("dataBase").collection("club");

    const clb = await collectionc.find({}).toArray();
    res.json(clb);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});


app.get('/fetchd', async (req, res) => {
  try {
    await client.connect();
    const collections = client.db("dataBase").collection("students");

    const std = await collections.find({ uid: req.query.uid }).toArray();
    res.json(std);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.get('/data', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("club");
    const collection2 = client.db("dataBase").collection("students");
    const collection3 = client.db("dataBase").collection("events");
    const collection4 = client.db("dataBase").collection("faculty");

    const Noe = await collection3.countDocuments({});
    const Nos = await collection2.countDocuments({});
    const Nof = await collection4.countDocuments({});
    const Noc = await collection1.countDocuments({});

    const data = {
      noe: Noe,
      nof: Nof,
      noc: Noc,
      nos: Nos
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

    const existingUser = await collection.findOne({ uid: req.body.uid });
    if (existingUser) {
      res.json({ message: '0' });
    } else {
      const passw = await enc.encr(req.body.password);
      await collection.insertOne({ name: req.body.name, pass: passw, uid: req.body.uid, club: req.body.club, vaild: "no" });
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
    const passw = await enc.encr(req.body.password)

    if (existingUser) {
      if (passw === existingUser.pass) {
        res.json({ message: '1' });
      }
      else {
        res.json({ message: '0' })
      }
    } else {
      res.json({ message: '-1' });
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/clubCreate', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("club");
    const collection1 = client.db("dataBase").collection("faculty");

    const existingclub = await collection.findOne({ name: req.body.nme });
    const faculty = await collection1.findOne({ Email: req.body.head })

    if (existingclub) {
      res.json({ message: '0' });
    }

    else if (!faculty) {
      res.json({ message: '2' })
    }
    else {
      await collection.insertOne({ name: req.body.nme, head: req.body.head });
      await collection1.updateOne({ Email: req.body.head }, { $set: { club: req.body.nme } });
      res.json({ message: '1' });
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/markcomp', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("events");
    if (req.body.op == "comp")
      await collection1.updateOne({ name: req.body.data, club: req.body.club }, { $set: { completed: "yes" } });
    else
      await collection1.deleteOne({ name: req.body.data, club: req.body.club });
    res.json({ message: '1' });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/marknotif', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("students");
    if (req.body.op == "app")
      await collection1.updateOne({ uid: req.body.data }, { $set: { vaild: "yes" } });
    else
      await collection1.deleteOne({ uid: req.body.data });
    res.json({ message: '1' });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/reg', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("events");
    const stud = { sname: req.body.nme, suid: req.body.uid }

    const e = await collection1.findOne({ name: req.body.data.name, club: req.body.club })

    if (e && e.students && e.students.some(student => student.sname === req.body.nme && student.suid === req.body.uid)) {
      res.json({ message: "0" })
    }

    else {
      await collection1.updateOne(
        { name: req.body.data.name, club: req.body.club },
        { $addToSet: { students: stud } }
      )
      res.json({ message: "1" })

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

    const existingevents = await collection1.findOne({ name: req.body.data.name, club: req.body.club });
    if (existingevents) {
      res.json({ message: '0' });
    }
    else {
      await collection1.insertOne({ name: req.body.data.name, des: req.body.data.des, date: req.body.data.date, club: req.body.club, completed: "no" });
      res.json({ message: '1' });
    }


  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/pubnotice', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("notice");
    const currentDate = moment().format('YYYY-MM-DD');
    await collection1.insertOne({ title: req.body.data.title, des: req.body.data.des, club: req.body.club, date: currentDate });
    res.json({ message: '1' });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/pubsugg', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("feedbacks");
    await collection1.insertOne({ title: req.body.data.title, des: req.body.data.des, club: req.body.club });
    res.json({ message: '1' });

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
      await collection.deleteOne({ name: req.body.nme });
      res.json({ message: '1' })
    }

    else {
      res.json({ message: '0' })
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/facultyDelete', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("faculty");

    const existing = await collection.findOne({ Email: req.body.Email });

    if (existing) {
      await collection.deleteOne({ Email: req.body.Email });
      res.json({ message: '1' })
    }

    else {
      res.json({ message: '0' })
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/user', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("students");

    const existingUser = await collection.findOne({ uid: req.body.uid });
    const passw = await enc.encr(req.body.password);

    if (existingUser) {
      if (existingUser.pass === passw) {
        res.json({ message: '1' });
      }
      else {
        res.json({ message: '0' })
      }
    } else {
      res.json({ message: '-1' });
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/facultyCreate', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("faculty");

    const existingUser = await collection.findOne({ Email: req.body.Email });
    if (existingUser) {
      res.json({ message: '0' });
    }
    else {
      const passw = await enc.encr(req.body.Pass);
      await collection.insertOne({ name: req.body.Fname, Email: req.body.Email, Pass: passw, club: 'null' });
      res.json({ message: '1' });
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/facultyfCreate', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("faculty");

    const existingUser = await collection.findOne({ Email: req.body.Email });
    if (existingUser) {
      res.json({ message: '0' });
    }
    else {
      const passw = await enc.encr(req.body.password);
      await collection.insertOne({ name: req.body.name, Email: req.body.email, Pass: passw, club: 'null' });
      res.json({ message: '1' });
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/faculty', async (req, res) => {
  try {
    await client.connect();
    const collection = client.db("dataBase").collection("faculty");

    const existingUser = await collection.findOne({ Email: req.body.Email });
    const passw = await enc.encr(req.body.Pass)
    if (existingUser) {
      if (passw === existingUser.Pass) {
        res.json({ message: '1', name: existingUser.name });
      }
      else {
        res.json({ message: '0' })
      }
    } else {
      res.json({ message: '-1' });
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/changepass', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("admin");
    const passw = await enc.encr(req.body.pass.rpass)
    if (await collection1.updateOne({ name: req.body.user }, { $set: { pass: passw } })) {
      res.json({ message: "1" })
    }

    else {
      res.json({ message: "0" })
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/changepas', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("faculty");
    const passw = await enc.encr(req.body.pass.rpass)
    if (await collection1.updateOne({ name: req.body.user }, { $set: { Pass: passw } })) {
      res.json({ message: "1" })
    }

    else {
      res.json({ message: "0" })
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

app.post('/changep', async (req, res) => {
  try {
    await client.connect();
    const collection1 = client.db("dataBase").collection("students");
    const passw = await enc.encr(req.body.pass.rpass)
    if (await collection1.updateOne({ uid: req.body.user }, { $set: { pass: passw } })) {
      res.json({ message: "1" })
    }

    else {
      res.json({ message: "0" })
    }

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ message: 'Error connecting to MongoDB' });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
