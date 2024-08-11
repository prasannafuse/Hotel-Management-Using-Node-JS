// EXPRESS
const express = require("express")
const app = express();


require('dotenv').config();
const PORT = process.env.PORT;// EXTRACTING PORT FROM .env FILE AS IT CANNOT BE SEND ON PUBLIC REPO.


// DATABASE
const db = require("./db");

// PARSER - To get the body ka data
const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

// Automatically formed
const { AsyncLocalStorage } = require("async_hooks");
const { error } = require("console");

// Welcome to homepage
app.get("/",(req,res)=>{
    res.send("Welcome to the Hotel");
});

// Import router files
const PersonRoutes = require("./routes/PersonRoutes");
const menuRoutes = require('./routes/menuRoutes');

// Use the routes
app.use('/person',PersonRoutes);
app.use('/menu',menuRoutes);

// Server is up
app.listen(PORT,()=>{
    console.log("Server started on 3000 PORT!!");
});