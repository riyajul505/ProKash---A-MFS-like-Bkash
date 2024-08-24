const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const saltRounds = 11;
const salt = bcrypt.genSaltSync(saltRounds);
require("dotenv").config();

const app = express();

const port = process.env.port || 5000;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ixzkh9v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const getId = (req, res, next) => {
  const token = req?.cookies?.token;
  if(!token){
    return res.status(401).send({message: 'no token available'})
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded)=>{
    if(error){
      return res.status(401).send({message: 'token error'})
    }
    req._id = decoded;
    next();
  })
}

async function run() {
  try {
    // collection names
    const usersCollection = client.db("Prokash").collection("Users-Collection");
    // get user data
    app.get('/user-details', getId, async (req, res)=>{
      const query = {_id: new ObjectId(req._id)};
      const result = await usersCollection.findOne(query);
      res.send(result);
    })
    // generate-token
    app.post('/create-token', (req, res)=>{
      const {_id} = req.body;
      const token = jwt.sign(_id, process.env.ACCESS_TOKEN_SECRET);
      res.cookie('token', token,{httpOnly: true}).send({message: 'token created'});
    })
    // login
    app.get('/login', async (req, res)=>{
      const plainPin = req.query.pin;
      console.log(req.query.number, req.query.pin);
      const result = await usersCollection.findOne({mobile_number:req.query.number});
      // checking pin with encrypted one
      const checkPin = bcrypt.compareSync(plainPin, result.pin);
      if(!checkPin && result){
        return res.send({message: 'Pin does not match'})
      }
      if(!checkPin && !result){
        return res.send({message: 'Number and PIN does not match'})
      }
      res.send(JSON.stringify(result._id));
      
    })
    // registration
    app.post("/registration", async (req, res) => {
      const userInfo = req.body;
      const {pin} = userInfo;
      const exist = await usersCollection.findOne({mobile_number: userInfo.mobile_number});
      if(exist){
        res.send({message: 'User already exist'})
      }
      else {
        // hashing pin
        const hashPin = bcrypt.hashSync(pin, salt);
        userInfo.pin = hashPin;
        // adding user
        const result = await usersCollection.insertOne(userInfo);
        res.send(result);
      }
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server running successfully");
});

app.listen(port, () => {
  console.log("server runninggg");
});
