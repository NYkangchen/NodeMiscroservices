//load express
const express = require("express");
const app = express();
const bodyPaerser=require("body-parser");

app.use(bodyPaerser.json());

//load mongoose
const mongoose = require("mongoose");
require("./Student")
const Student = mongoose.model("Student");

//connect
mongoose.connect("mongodb+srv://kangchen:ck1124@studentservice.zijsy.mongodb.net/ studentservice?retryWrites=true&w=majority",()=>{
    console.log("Database is connected !!!");
});

app.get('/',(req,res)=>{
    res.send("This is main endpoint!");
})

//send data to DB
app.post("/student",(req,res)=>{
    var newStudent= {
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
        address: req.body.address
    }
    //create a new book
    var student= new Student(newStudent)
    student.save().then(()=>{
        console.log("New Stduent Created! ")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
    res.send("A new Student is regiested")

    console.log(req.body)
    
})
//get data from DB
app.get("/students",(req,res)=>{
    Student.find().then((students)=>{
        res.json(students)
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})
//通过ID获取指定Data
app.get("/student/:id",(req,res)=>{
    Student.findById(req.params.id).then((student)=>{
        if(student){
            //Student data
            res.json(student)
        }else{
            res.sendStatus(404);
        }

    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})
//删除数据
app.delete("/student/:id",(req,res)=>{
    Student.findOneAndRemove(req.params.id).then(()=>{
        res.send("Student removed")
    }).catch(err =>{
        if(err){
            throw err;
        }
    })
})

app.listen(4545,()=>{
    console.log("Up and running! -- This is Students service");
})
