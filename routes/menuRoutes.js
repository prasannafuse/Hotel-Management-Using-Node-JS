const express = require('express');
const router = express.Router();
const Menu = require('./../models/menu');

// Menu - POST
router.post("/", async (req,res)=>{
    try{
    const data = req.body;
    const newMenu = new Menu(data); // Menu is required above.
    const savedMenu = await newMenu.save();
    console.log("Menu Saved!!");
    res.status(200).json({savedMenu});
    }
    catch{
        console.log(err);
        res.status(500).json({error: "Internal Server Error"})
    }

});

// Menu - GET
router.get("/", async (req,res)=>{
    try{
        const data = await Menu.find();
        console.log("Data Fetched!!");
        res.send(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

// Parameterized URL
router.get("/:type",async(req,res)=>{
    try{
        const type = req.params.type; // Extract work type form the url.
        const response = await Menu.find({type:type});
        console.log("Response fetched.");
        console.log(response);
        res.status(200).json(response);
    }
    catch(err){
        res.status(500).json({error:"Invalid server error."});
    }
});


module.exports = router;