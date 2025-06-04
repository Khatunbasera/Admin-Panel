const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    paymentStatus:{
        type:Boolean,
        required:true
    },
    courseName:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        default:false
    }
});

module.exports = mongoose.model('Student',studentSchema);