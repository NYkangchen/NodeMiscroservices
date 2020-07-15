const mongoose = require ("mongoose")

mongoose.model('Teacher',{
    name:{
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: false
    }
})