// EXPRESS
const express = require("express")
const app = express();
const PORT = 3000;

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

app.listen(PORT,()=>{
    console.log("Server started on 3000 PORT!!");
});