const { MongoClient, ServerApiVersion } = require("mongodb");
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

async function run() {
  try {
    // collection names
    const usersCollection = client.db("Prokash").collection("Users-Collection");
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
        console.log(result.insertedId);
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
