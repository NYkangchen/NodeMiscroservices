const express = require("express")
const app= express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

app.use(bodyParser.json());

//Connect to our database
mongoose.connect("mongodb+srv://kangchen:<password>@studentservice.zijsy.mongodb.net/teacherservice?retryWrites=true&w=majority",()=>{
    console.log("Database connected - Teacher service")
})

//load out model
require("./Teacher")
const Teacher = mongoose.model("Teacher")

app.post("/teacher",(req,res)=>{
    var newTeacher ={
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    var teacher= new Teacher(newTeacher)
    teacher.save().then(()=>{
        res.send("Teacher is created")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})
//查询全部
app.get("/teachers",(req,res)=>{
    Teacher.find().then((teachers)=>{
        res.json(teachers)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

app.get("/teacher/:id",(req,res)=>{
    Teacher.findById(req.params.id).then((teacher)=>{
        if(teacher){
            res.json(teacher)
        }else{
            res.send("Invalid")
        }
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

app.delete("/teacher/:id",(req,res)=>{
    Teacher.findByIdAndRemove(req.params.id).then(()=>{
        res.send("Teacher deleted")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

app.listen("5555",()=>{
    console.log("Up and running - Teachers service")
})
