// accessing the express module
const express = require('express');

const port = 8000;

// firing up the express server
const app = express();  // here in app we are keeping all the express module which will be needed later on

app.listen(port,function(err){
    if(err){
        console.log("Error in running the express server");
        return;
    }
    console.log("The server is up and running on port:",port);
})