const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// Person - POST
router.post("/",async (req,res)=>{
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
        const workType = req.params.workType; // Extract work type form the url.
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

})
module.exports = router;