
/* Method 1 */
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://elbanco77:sharksurfsaladita@bank-3t.jddjwcm.mongodb.net/?retryWrites=true&w=majority";

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
/**/

/* Method 2
const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://elbanco77:sharksurfsaladita@bank-3t.jddjwcm.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/


/* Method 3
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://elbanco77:sharksurfsaladita@bank-3t.jddjwcm.mongodb.net/?retryWrites=true&w=majority";
//const url = 'mongodb://localhost:27017';
//const url = 'mongodb://mongo:27017';
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    //db = client.db('badbank');
    db = client.db('bank-3t');
});
*/

// create user account
function create(name, email, password, balance, accountnum){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        balance = parseInt(balance);
        const doc = {name, email, password, balance, accountnum};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// deposit into database
function deposit(email, balance) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        balance = parseInt(balance);
        collection.updateOne(
                {"email":email}, 
                {$inc: {"balance":balance}},
                function(err, result) {err ? reject(err) : resolve(result);}
            )
    });   
}

// withdraw from database
function withdraw(email, balance) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        balance = -parseInt(balance);
        collection.updateOne(
                {"email":email}, 
                {$inc: {"balance":balance}},
                function(err, result) {err ? reject(err) : resolve(result);}
            )
    });   
}

// find user account balance
function balance(email) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        collection.find({"email":email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            }); 
    });   
}

// find user with given email and password, returns an empty array if doesn't exist
function login(email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        collection.find({
            $and: [
                {"email": {$eq: email}}, 
                {"password": {$eq: password}}
            ]
        })
        .toArray(function(err, docs) {
            err ? reject(err) : resolve(docs);
        }); 
    });   
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({"email": email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, all, deposit, withdraw, balance, login, find};