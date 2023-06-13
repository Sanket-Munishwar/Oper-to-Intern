const collageModel = require('../models/collageModel')

//==========regex for college name and college full name==============
let nameRegex = /^[A-Za-z]{2,20}$/
let fullNameRegex = /^[a-zA-Z ,-]*$/
let urlRegex = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i


let createCollage = async function(req, res){
    try {
        let data = req.body
        let{name,fullName, logoLink} = data
        if(Object.keys(req.body).length!=0){
            if(!name || name==" "){
                res.status(400).send({status:false, message:"Name field can not be empty"})
            }
            if(typeof(name) != "string"){
                res.status(400).send({status:false, message:"type of name shoul only be string"})
            }
            if(!name.match(nameRegex)){
                res.status(400).send({status:false,message:"Please provide valid name"})
            }
            let uniqueName = await collageModel.findOne({name:name, isDeleted:false})
            if(uniqueName && uniqueName.isDeleted == false){
                res.status(400).send({status:false, message:"This name is already exist, Please provide different name"})
            }
            if(!fullName || fullName==" "){
                res.status(400).send({status:false, message:"FullName field can not be empty"})
            }
            if(!fullName.match(fullNameRegex)){
                res.status(400).send({status:false,message:"Please provide valid Fullname"})
            }
            if(!logoLink || logoLink==" "){
                res.status(400).send({status:false, message:"Name field can not be empty"})
            }
            if(!logoLink.match(urlRegex)){
                res.status(400).send({status:false,message:"Please provide valid name"})
            }
            let collageCreate = await collageModel.create(req.body)
            let result = await collageModel.findById(collageCreate.id).select({_id:0, createdAt:0,UpdatedAt:0, _v:0})
             res.status(201).send({status:true, data:result})
        }
        else{
            res.status(400).send({status:false, message:"invalid request"})
        }
    } catch (error) {
        res.status(500).send({status:false, message:error.message})
    }
}




module.exports.createCollage =createCollage