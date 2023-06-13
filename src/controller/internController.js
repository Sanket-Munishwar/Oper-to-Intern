const internModel = require('../models/internModel')
const collageModel = require('../models/collageModel')
const checkEmail = require('email-validator')


let nameRegex = /^[a-z A-Z]{1,20}$/



const createIntern = async function(req, res){
    res.setHeader("Access-Control-Allow-Origin" , "*")   //the server indicates that it is willing to respond to requests coming from any origin, regardless of the domain from which the request originated
    try {
        data = req.body
        let { name, mobile, email, collegeName} = data
        if(Object.keys(data).length != 0){
            if(!name || name == " "){
                res.status(400).send({status:false, message:"name is required"})
            }
            if(!nameRegex.test(name)){
                res.status(400).send({status:false, message:"Please provide valid intern name"})
            }
            if(!email || email == " "){
                res.status(400).send({status:false, message:"email shoul not be empty, Please provide email"})
            }
            if(!checkEmail.validate(email)){
                res.status(400).send({status:false, message:"Please provide valid email"})
            }
            const validEmail = await internModel.findOne({email:data.email})
            if(validEmail){
                res.status(400).send({status:false, message:"Email is already created please provide different email"})
            }
            if(!mobile || mobile == " "){
                res.status(400).send({status:false, message:"Please provide mobile"})
            }
            if(typeof(mobile) != "string"){
                res.status(400).send({status:false, message:"please provide valid mobile number "})
            }
            const validMobile = await internModel.findOne({mobile: data.mobile})
            if(validMobile){
                res.status(400).send({status:false, message:"Mobile is already in stored please provide different mobile"})
            }
            if(!collegeName || collegeName == " "){
                res.status(400).send({status:false, message:"Please provide collage Id "})
            }
            const findCollegeId = await collageModel.findOne({name:collegeName, isDeleted:false}).select({_id:1})
            if(!findCollegeId){
                res.status(400).send({status:false, message:"No college has found , Please provided valid college name"})
            }
            data.collegeId = findCollegeId._id

            const createIntern = await internModel.create(data)

            const result = await internModel.findById(createIntern._id).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });

            res.status(201).send({ status: true, data: result });
        }
        else{
            res.status(400).send({status:false, message:"invalid request"})
        }
    } catch (error) {
        res.status(500).send({status:false, message:error.message})
    }
}


const getdata = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin" , "*");
    try {
        const data = req.query.collegeName
        if (Object.keys(req.query).length != 0) {

            let getAll = await collageModel.findOne({ name: data, isDeleted: false });

            if (!getAll) {
                return res.status(404).send({ status: false, message: "Data not found or College already deleted." });
            }
            let Id = getAll._id;

            let internsData = await internModel.find({ collegeId: Id, isDeleted: false }).select({ name: 1, email: 1, mobile: 1, _id: 1 });
            if (internsData.length == 0) {
                return res.status(404).send({ status: false, message: "No interns have applied for this college." });
            }

            let x = internsData;
            let collegeData = await collageModel.findOne({ name: data }).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0, isDeleted: 0 })

            collegeData._doc.interns = x;

            res.status(201).send({ status: true, data: collegeData });
        } else {
            return res.status(400).send({ status: false, message: "Invalid Request." });
        }
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


module.exports = {getdata, createIntern}