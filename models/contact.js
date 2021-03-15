// Schema is defination of what fields need to be there in one document.
// a document needs a schema which needs to be defined in mongoose and mongoose then populate the collection/model using schema
const mongoose = require('mongoose');

// creating a contact schema
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});

// compiling the schema into a model
const Contact = mongoose.model('contacts',contactSchema);

// export the contact collection
module.exports = Contact;