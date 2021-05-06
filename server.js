/*
CSC3916 Final Project
Title: Banking App
File: Server.js
By: Amanuel Chukala
Description: Web API for Customers in a banking system
 */

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');

const mongoose = require('mongoose');
require('dotenv').config();

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());


mongoose.Promise = global.Promise;

try {
    mongoose.connect( process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
        console.log("connected to DB"));
}catch (error) {
    console.log("could not connect to the DB");
}
mongoose.set('useCreateIndex', true);

const customerRouter = require('./routes/customers');
const EmployeeRouter = require('./routes/employees');
app.use('/customers', customerRouter);
app.use('/employee', EmployeeRouter);


app.listen(process.env.PORT || 8080);
module.exports = app; // for testing only


