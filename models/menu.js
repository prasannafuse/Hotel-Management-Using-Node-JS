const mongoose = require('mongoose');
const { type } = require('os');

const menuSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

});

// create Menu model
const Menu = mongoose.model("menu",menuSchema);

module.exports = Menu;