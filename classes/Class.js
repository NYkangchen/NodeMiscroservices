const mongoose= require("mongoose")

mongoose.model("Class",{
    TeacherID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    StudentID:{
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    startDate:{
        type: Date,
        required:true
    },
    endDate:{
        type: Date,
        required: true
    }
})