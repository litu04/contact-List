// accessing the express module
const express = require('express');

// accessing the path module
const path = require('path');

const port = 8000;

// firing up the express server
const app = express();  // here in app we are keeping all the express module which will be needed later on

// setting up the view engine
app.set('view engine','ejs');

// accessing the path of the views where we can rendered the HTMl file into the browser
app.set('views',path.join(__dirname,'views'));

app.get('/',function(req,res){
    //console.log("url:",req);
    //console.log(__dirname);
    return res.render('home', {
        title: "Contact List"
    });
    //res.send('<h1>Cool! It is running or is it?</h1>');
});


app.listen(port,function(err){
    if(err){
        console.log("Error in running the express server");
        return;
    }
    console.log("The server is up and running on port:",port);
})