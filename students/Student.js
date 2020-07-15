const mongoose = require("mongoose");

mongoose.model("Student",{
    name: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },  
    age: {
        type: Number,
        require: false
    },
    address: {
        type: String,
        require: false
    }
});