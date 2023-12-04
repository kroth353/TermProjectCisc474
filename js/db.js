// node and express

const express = require("express");
const fs = require("fs");
const path = require('path');
const app = express();
const port = 8080;
app.use( function ( req, res, next ) {
const { url, path: routePath } = req ;
console.log( 'Request: Timestamp:', new Date().toLocaleString(), ', URL (' + url + '), PATH (' + routePath + ').' ) ;
next();
});

app.use('/', express.static(path.join(__dirname, '')))
app.listen(port, () => {
console.log(`Server running on port ${port}...`)
});

/*
// firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEOf5GZvI9lOV3LDNqFf6KIfM1hkARmvk",
  authDomain: "memory-431d8.firebaseapp.com",
  databaseURL: "https://memory-431d8-default-rtdb.firebaseio.com",
  projectId: "memory-431d8",
  storageBucket: "memory-431d8.appspot.com",
  messagingSenderId: "697270213175",
  appId: "1:697270213175:web:26b5aaed20f11da6acfdb2",
  measurementId: "G-24NNJMYG3Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/


// mongoDB connection

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jasonh:<April.5.2002>@cluster0.qreeccy.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// signup

app.post('/api/v1/addUser', function(req, res) {
    const username = req.query.username;
    const email = req.query.email;
    const password = req.query.password;
    data = {'username':username, 'email':email, 'password':password};
    console.log(data);
    res.end(addUser(client, data));
});

async function addUser(client, user){
  const result = await client.db("cluster0").collection("users").insertOne(user);
  console.log(`New user created with the following id: ${result.insertedId}`);
  return result.insertedId;
}

// log in 

app.get('/api/v1/login', function(req, res) {
    const username = req.query.username;
    const password = req.query.password;
    const id = authenticate(client, username, password)
    if(id) {
      res.end(id)
    }
});

async function authenticate(client, username, password) {
    if(password == await client.db("cluster0").collection("users").findOne( {"username": username}.password )) {
       return await client.db("cluster0").collection("users").findOne( {"username": username}.__id);
    }
    return null;
}

// delete account

app.delete('/api/v1/deleteUser', function(req, res){
  const userID = req.query.userID;
  deleteUser(client, userID);
  res.end(userID);
});

async function deleteUser(client, userID) {
  const result = await client.db("cluster0").collection("users").deleteOne( {"__id": ObjectID(userID)} )
}