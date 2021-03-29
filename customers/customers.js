const express = require("express")
app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())

//Importando Mongoose, conectando ao banco e setando o Model criado
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://kinker:2384mongo@cluster0.ombm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () =>{
    console.log("database2 connected")
})
require ("./Customer")
const Customer = mongoose.model("Customer")

//Post, get e Delete

app.post("/customer", (req, res) => {
    var newCustomer = {
       name: req.body.name,
        age: req.body.age,
        adress: req.body.adress
    }
    var customer = new Customer(newCustomer)
    customer.save().then(() => {
        res.send("Customer created")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})


app.get("/customer", (req,res) => {
    Customer.find().then((customer)=>{
        res.json(customer)
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get("/customer/:id", (req,res) => {
   Customer.findById(req.params.id).then((customer)=>{
       if(customer){
           res.json(customer)
       }
       else{
           res.send("Invalid Id")
       }
   })
})

app.delete("/customer/:id", (req,res) => {
    Customer.findByIdAndRemove(req.params.id).then(() => {
        res.send("deletado")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})


app.listen("4001")