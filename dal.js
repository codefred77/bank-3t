/* Method 1 */
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://elbanco77:sharksurfsaladita@bank-3t.jddjwcm.mongodb.net/?retryWrites=true&w=majority";

async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  return client.db('bank-3t');
}

let db = null;

async function initializeDatabase() {
  try {
    db = await connectToDatabase();
    console.log('Connected to the database successfully!');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}

initializeDatabase();

/* Method 2 -- original method
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
//const url = 'mongodb://mongo:27017';
let db = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    //db = client.db('badbank');
    db = client.db('bank-3t');
});
*/

// Create user account
function create(name, email, password, cbal, cnum){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        cbal = parseInt(cbal);
        const doc = {name, email, password, cbal, cnum};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// Deposit into database
function deposit(email, cbal) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        cbal = parseInt(cbal);
        collection.updateOne(
                {"email":email}, 
                {$inc: {"cbal":cbal}},
                function(err, result) {err ? reject(err) : resolve(result);}
            )
    });   
}

// Withdraw from database
function withdraw(email, cbal) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        cbal = -parseInt(cbal);
        collection.updateOne(
                {"email":email}, 
                {$inc: {"cbal":cbal}},
                function(err, result) {err ? reject(err) : resolve(result);}
            )
    });   
}

// Find user account balance
function balance(email) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        collection.find({"email":email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            }); 
    });   
}

// Find user with given email and password, returns an empty array if doesn't exist
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

// Find user account
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

// All users
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