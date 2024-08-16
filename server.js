// EXPRESS
const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT not set

// Authentication file
const passport = require('./auth');

// DATABASE
const db = require("./db");

// PARSER - To get the body data
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body

// Initialize passport
app.use(passport.initialize());

// Authentication middleware
const localAuthMiddleware = passport.authenticate('local', { session: false });

// Welcome to homepage (Protected Route)
app.get("/", localAuthMiddleware, (req, res) => {
    res.send("Welcome to the Hotel");
});

// Import router files
const PersonRoutes = require("./routes/PersonRoutes");
const menuRoutes = require('./routes/menuRoutes');

// Use the routes
app.use('/person',localAuthMiddleware,PersonRoutes);
app.use('/menu',menuRoutes);

// Server is up
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});


// First remove the authorization ---> add the data using POST method ---> data in the db will be saved and password will be hashed.--> Search the data using GET method.