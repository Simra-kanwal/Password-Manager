import express from 'express';
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const database = 'PassOP';

await client.connect();

//get all passwords
app.get('/', async(req, res) => {
  const db = client.db(database);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

//Save a password
app.post('/', async(req, res) => {
  const password = req.body;
  const db = client.db(database);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({result: true , findResult})
})

//Delete a password
app.delete('/', async(req, res) => {
  const password = req.body;
  const db = client.db(database);
  const collection = db.collection('passwords');
  const findResult = await collection.deleteOne(password);
  res.send({result: true})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})