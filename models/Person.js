const mongoose = require('mongoose');
const { type } = require('os');

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        enum: ['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:Number,
        required:true
    }
});

// create person model
const person = mongoose.model('Person',personSchema);

module.exports = person;