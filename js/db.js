// node and express
// This imports the express framework
const express = require("express");
// Imports nodejs file system module
const fs = require("fs");
// Imports nodejs path module
const path = require('path');
// Creates an instance of express called app
const app = express();
// Port number
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

// mongoDB connection
// This is how we connect to the MongoDB database. We create an instance in the variable client before sending a 
// ping to it via the async function run.
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
// This is how we create different accounts for users. We take the information provided by the user and store it in an object
// before calling a function to add the object to the database.
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
// This is used to log and authenticate different users. This is done by extracting the username and password from the user
// input and then checking if that combination of username and password can be found.
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
// This is used to delete user accounts from the database. 
app.delete('/api/v1/deleteUser', function(req, res){
  const id = req.query.id;
  deleteUser(client, userID);
  res.end(userID);
});

async function deleteUser(client, userID) {
  const result = await client.db("cluster0").collection("users").deleteOne( {"__id": ObjectID(userID)} )
}

//send highscore
// postHighscore posts a a new high score to the database while highscore checks if a score is considered a highscore. 
// both of these check and push scores based on the id of the user and the game.
app.postHighscore('/api/v1/highscore', async function(req, res) {
  const id = req.query.id;
  const score = req.query.score;
  const game = req.query.game;
  console.log("highscore{id:" + id + ",score" + score + ",game" + game + "}");
  pushHighScore(id, score, game);
  res.end(id);
});

app.highscore('/api/v1/checkHighscore', async function(req, res) {
  if(id) {
    const currentHighScore = await client.db("cluster0").collection(game).findOne( {"id": id}.score)
    if (currenHighScore == null || score > currentHighScore) {
      res.end('true');
    }
  }
  res.end('false');
});

//pushes a high score into the specified MongoDB collection
async function pushHighScore(id, score, game) {
  const result = await client.db("cluster0").collection(game).insertOne( {"id": id, "score": score} );
}