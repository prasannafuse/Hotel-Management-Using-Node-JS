const mongoose = require('mongoose');

const mongoURL = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection; // This object is used to handle events and interact with the database.

db.on('connected',()=>{
    console.log("Connected with MongoDB server!");
});

db.on("error",(err)=>{
    console.log("Error found: ",err);
});

db.on("disconnected",()=>{
    console.log("MongoDB Disconnected!!");
});

// Export to the server
module.exports = db;