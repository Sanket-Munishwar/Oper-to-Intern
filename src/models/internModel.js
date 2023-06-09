const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        trim:true
    },
    mobile:{
        type:String,
        require:true,
        trim:true,
        unique:true
    },
    collegeId:{
        type:mongoose.Types.ObjectId,
        ref:"collageModel"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('internModel',internSchema)