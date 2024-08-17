const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt');

// Person - POST
router.post("/",jwtAuthMiddleware,async (req,res)=>{
    try{
        const data = req.body; 
        const newPerson = new Person(data);
        const savePerson = await newPerson.save();
        console.log('Data Saved');
        res.status(200).json(savePerson);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
});

// Person - GET
router.get("/",async(req,res)=>{
    try{
        const data = await Person.find();
        console.log("Data Fetched");
        res.send(data);
    }
    catch(err){
        console.log("Error Encountered: ",err);
        res.status(500).json({error: "Internal server error"});
    }
});

// Paratermized routes
router.get("/:workType",async(req,res)=>{
    try{
        const workType = req.params.workType; // Extract workType form the url.
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response = await Person.find({work: workType});
            console.log("Response fetched.");
            res.status(200).json(response);

        }else{
            res.status(404).json({error: 'Invalid work type.'});
        }
    }
    catch(err){
        res.status(500).json("Invalid server error.");
    }
});


router.put('/:id',async (req,res)=>{
    try{
        const personID = req.params.id;
        const UpdatePersonData = req.body;

        const resposne = await Person.findByIdAndUpdate(personID,UpdatePersonData,{
            new :true, 
            runValidators:true,
        });

        console.log("Data Updated!");

        res.status(200).json(resposne);


    }
    catch(err){
        res.status(500).json({error:"Internal Server Error"});
    }

});

// POST route to add a person
router.post('/signup', async (req, res) =>{
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        // res.status(200).json(response);

        const payload = {
            id: response.id,
            username: response.username
        }

        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await Person.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const payload = { id: user.id, username: user.username };
        const token = generateToken(payload);

        res.status(200).json({ success: true, token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;