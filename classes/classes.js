const exrpress= require("express");
const app=exrpress();
const bodyPaser = require("body-parser");
const mongoose=require("mongoose")
const axios=require("axios")

app.use(bodyPaser.json())
//connect to DB
mongoose.connect("mongodb+srv://kangchen:<password>@studentservice.zijsy.mongodb.net/classservice?retryWrites=true&w=majority",()=>{
    console.log("Database connected - Classes ")
})

require("./Class")
const Class = mongoose.model("Class")

//create a new class
app.post("/class",(req,res)=>{
    var newClass = {
        TeacherID: mongoose.Types.ObjectId(req.body.TeacherID),
        StudentID: mongoose.Types.ObjectId(req.body.StudentID),
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }

    var myclass = new Class(newClass);
    myclass.save().then(()=>{
        res.send("Class created successful")
        console.log("Class created")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

app.get("/classes",(req,res)=>{
    Class.find().then((students)=>{
        res.json(students)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

app.get("/class/:id",(req,res)=>{
    Class.findById(req.params.id).then((myclass)=>{
        if(myclass){
            axios.get("http://localhost:5555/teacher/"+myclass.TeacherID).then((response)=>{
                var classObject = {teacherName: response.data.name, studentName: ''}

                axios.get("http://localhost:4545/student/" + myclass.StudentID).then((response)=>{
                    classObject.studentName = response.data.name
                    res.json(classObject)
                })
            })
            res.send("Quick response")
        }else{
            res.send("Invalid class")
        }
    })
})

app.listen(7777,()=>{
    console.log("Up and running - Classes services")
})
