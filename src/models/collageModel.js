const mongoose = require('mongoose')

const collageSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    fullName:{
        type:String,
        require:true,
        lowercase:true,
        trim:true
    },
    logoLink:{
        type:String,
        require:true,
        trim:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {timestamps:true})


module.exports = mongoose.model('collageModel',collageSchema)