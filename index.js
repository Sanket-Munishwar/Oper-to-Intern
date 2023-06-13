const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const route = require('./src/routes/route')
const app = express()


mongoose.set('strictQuery', true)

app.use(express.json())
app.use(multer().any())

mongoose.connect('mongodb+srv://sanketmunishwar7:q5WEY4lK4vMAzwbJ@cluster0.0jenlvx.mongodb.net/open-to-intern?retryWrites=true&w=majority',{
    useNewUrlParser: true
})
.then(()=> console.log("MongoDB is connected ..."))
.catch((err)=> console.log(err))


app.use('/',route)


app.listen(3000, function(){
    console.log("express app is running on port "+ 3000)
})