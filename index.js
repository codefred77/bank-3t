var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// check if a user already exist by searching database for the email
app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// Create user account
app.get('/account/create/:name/:email/:password/:balance/:accountnum', function (req, res) {
    dal.create(req.params.name,req.params.email,req.params.password,req.params.balance,req.params.accountnum).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// Deposit
app.get('/account/deposit/:email/:balance', function (req, res) {
    dal.deposit(req.params.email,req.params.balance).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// Withdrawal
app.get('/account/withdraw/:email/:balance', function (req, res) {
    dal.withdraw(req.params.email,req.params.balance).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// Login
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email,req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// Balance
app.get('/account/balance/:email', function (req, res) {
    dal.balance(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);            
        });    
});

// All accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);
console.log('Running on port: ' + port);