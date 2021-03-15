// accessing the express module
const express = require('express');

// accessing the path module
const path = require('path');

const port = 8000;

//import the db from config(mongoose.js)
const db = require('./config/mongoose');

//importing the contact schema
const Contact = require('./models/contact');

// firing up the express server
const app = express();  // here in app we are keeping all the express module which will be needed later on

// setting up the view engine
app.set('view engine','ejs');

// accessing the path of the views where we can rendered the HTMl file into the browser
app.set('views',path.join(__dirname,'views'));

// using middleware to read and analyzed the parse encoded data
app.use(express.urlencoded());

// accessing the static files through middleware
app.use(express.static('assets'));

// creating a contact list

// contactList = [
//     {
//         name: 'Debraj',
//         phone: 9876543215
//     },
//     {
//         name: 'Pintu',
//         phone: 7645129839
//     },
//     {
//         name: 'Riya',
//         phone: 8298761245
//     }
// ]

app.get('/',function(req,res){
    //console.log("url:",req);
    //console.log(__dirname);

    Contact.find({},function(err,contactList){
        if(err){
            console.log("Error in fetching contacts from DB");
            return;
        }

        return res.render('home', {
            title: "Contact List",
            contact_list: contactList
        });
    })
    
    //res.send('<h1>Cool! It is running or is it?</h1>');
});

app.post('/create-contact',function(req,res){
    //console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.phone);
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    //contactList.push(req.body);

    // pushing the contacts to the DB
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log("***********",newContact);
        return res.redirect('back');
    });

})

// deleting a contact list using query params and string params

// app.get('/delete-contact',function(req,res){
//     // get the query from the url
//     //commitlet phone = req.params.phone  // for string param
//     let phone = req.query.phone;  // for query param
//     console.log(req.query);

//     let contactIndex = contactList.findIndex(contact => contact.phone == phone);

//     if (contactIndex != -1){
//         contactList.splice(contactIndex, 1);
//     }

//     return res.redirect('back');
// });

// deleting contact details from the db using string params

// app.get('/delete-contact/:id',function(req,res){
//     // get the id as string params from the url
//     let id = req.params.id;
//     console.log(req.params);

//     Contact.findByIdAndDelete(id,function(err){
//         if(err){
//             console.log("Error in deleting the contact details");
//             return;
//         }
//     });
//     return res.redirect('/');
// })

// deleting the contact details from the DB using query params
app.get('/delete-contact',function(req,res){
    // get the id as query params from the url
    let id = req.query.id;
    console.log(req.query);

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting the contact details");
            return;
        }
    });
    return res.redirect('back');
})

app.listen(port,function(err){
    if(err){
        console.log("Error in running the express server");
        return;
    }
    console.log("The server is up and running on port:",port);
})