const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const route = require('./src/routes/route')
const app = express()


mongoose.set('strictQuery', true)

app.use(JSON.express())
app.use(multer().any())

mongoose.connect('',{
    useNewUrlParser: true
})
.then(()=> console.log("MongoDB is connected ..."))
.catch((err)=> console.log(err))


app.use('/',route)


app.listen(3000, function(){
    console.log("express app is running on port "+ 3000)
})