const mongoose = require("mongoose")

mongoose.model("Customer", {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required:true
    },
    adress:{
        type:String,
        required: true
    }
})