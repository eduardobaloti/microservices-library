const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const axios = require("axios")

//Importando Mongoose, conectando ao banco e setando o Model criado
const mongoose = require("mongoose")
const { response } = require("express")
mongoose.connect("mongodb+srv://kinker:2384mongo@service3.traix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => {
    console.log("database3 connected")
})
require("./Order")
const Order = mongoose.model("Order")

app.get("/order", (req,res) => {
    Order.find().then((order)=>{
        res.json(order)
    }).catch((err) => {
        if(err){
            throw err;
        }
    }).catch((err) => {
        if(err){
            throw err
        }
    })
})

app.post("/order", (req, res)=>{
    var newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate
    }

    var order = new Order(newOrder)
    order.save().then(() => {
        res.send("order created")
    }).catch((err)=>{
        if(err){
            throw err
        }
    })
})

app.get("/orders", (req, res) =>{
    Order.find().then((order)=>{
        res.json(order)
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})


//Get Utilizando Axios para requisitar outros serviços
app.get("/order/:id", (req, res) =>{
    Order.findById(req.params.id).then((order) => {
        if(order){         
            axios.get("http://localhost:4001/customer/" + order.CustomerID).then((response)=> {
            var orderObject = {customerName: response.data.name, bookTitle:''}
            axios.get("http://localhost:4000/book/" + order.BookID).then((response) => {
                    orderObject.bookTitle = response.data.title
                    res.json(orderObject)
                })
        })
        }else{
            res.send("Invalid")
        }
    })
})

app.listen(4002)