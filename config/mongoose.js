// accessing the mongoose library
const mongoose = require('mongoose');

//connecting to the db
mongoose.connect('mongodb://localhost/contacts_db');

// acquiring the connection (to check if it was successful)
const db = mongoose.connection;

//error message
db.on('error',console.error.bind(console,'Error while connecting to the DB'));

// up and running (printing the success message)
db.once('open',function(){
    console.log("Successfully connected to the database");
});