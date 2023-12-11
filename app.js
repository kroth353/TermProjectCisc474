

// db

// node and express

const express = require("express");
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

// mongoDB connection

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://jasonh:April.5.2002@cluster0.qreeccy.mongodb.net/?retryWrites=true&w=majority";
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

    // signup

    app.post('/api/v1/addUser', function(req, res) {
        const username = req.query.username;
        const email = req.query.email;
        const password = req.query.password;
        data = {'username':username, 'email':email, 'password':password};
        console.log(data);
        addUser(client, data).then(function(id) {
            res.send(id);
        });
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
        //let id = authenticate(client, username, password).then();
        let idstr = null;
        client.db("cluster0").collection("users").findOne( {"username": username}, { "password": 1 } ).then(function(pass) {
            console.log(pass.password);
            if(password == pass.password) {
                console.log("inside if");
                client.db("cluster0").collection("users").findOne( {"username": username}, { _id: 1 }).then(function(id) {
                    let idval = id._id;
                    idstr = idval.toString();
                    console.log(idstr);
                    console.log("id: " + id);
                    if(idstr !== null) {
                        res.send(idstr);
                    } else {
                        res.send("");
                    }
                });
            }     
        });
    });

    // delete account

    app.delete('/api/v1/deleteUser', function(req, res){
        const userID = req.query.id;
        deleteUser(client, userID);
        res.send(userID);
    });

    async function deleteUser(client, userID) {
        await client.db("cluster0").collection("users").deleteOne( {"__id": ObjectID(userID)} );
    }

    //send highscore

    app.post('/api/v1/highscore', async function(req, res) {
        const id = req.query.id;
        const score = req.query.score;
        const game = req.query.game;
        console.log("highscore{id:" + id + ",score:" + score + ",game:" + game + "}");
        const boolHighScore = await checkHighScore(id, score, game);
        if(boolHighScore) {
            console.log("checkHighScore is true");
            pushHighScore(id, score, game);
            console.log("highscore posted");
        }
        res.end(id);
    });
    
    async function checkHighScore(id, score, game) {
        if(id) {
            let currentHighScore = await client.db("cluster0").collection(game).findOne( {"id": id}, {"score":1} );
            if(currentHighScore == null) {
                console.log("currentHighScore is null");
                return true;
            } else {
                let currentHighScoreVal = currentHighScore.score;
                console.log("current highscore: " + currentHighScoreVal);
                if (score > currentHighScoreVal) {
                    console.log("new highscore");
                    const result = await client.db("cluster0").collection(game).deleteOne( {"id": id} );
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
    
    async function pushHighScore(id, score, game) {
        console.log("pushing high score");
        const uId = new ObjectId(id);
        const u = await client.db("cluster0").collection("users").findOne( {"_id": uId}, {"username": 1} );
        client.db("cluster0").collection(game).insertOne( {"id": id, "username": u.username, "score": score} );
    }

    app.get('/api/v1/leaderboard', async function(req, res) {
        const game = req.query.game;
        //const topTen = {"topTenArr": []};
        const topTen = await client.db("cluster0").collection(game).find().sort({ "score":1 }).limit(10).toArray();
        //while (await cursor.hasNext()) {
        //    topTen.topTenArr.push(await cursor.next());
        //}
        console.log("api get topTen: " + JSON.stringify(topTen));
        res.end(JSON.stringify(topTen));
    });

} finally {
    // Ensures that the client will close when you finish/error
    console.log("hit close");
    //await client.close();
  }
}

run().catch(console.dir);