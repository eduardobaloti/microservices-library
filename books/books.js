const express = require('express');
const app = express();
const mongoose = require("mongoose");
require("./Book");

//Importando Mongoose, conectando ao banco e setando o Model criado
const Book = mongoose.model("Book");
const bodyParser = require("body-parser");
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://kinker:2384mongo@nodetest.t4w06.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {
    console.log("database1 connected")
});

app.get('/book', (req, res) => {
    Book.find().then((books) => {
        res.json(books)
    }).catch(err=>{
        if(err){
            throw err;
        }
    })
})

app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id).then((book) => {
        if (book) {
            res.json(book)
        }
        else{
            res.sendStatus(404);
        }
    }).catch(err =>{
        if(err){
            throw err;
        }
    }) 
})

app.post("/book", (req, res) => {
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publiser: req.body.publiser

    }
    var book = new Book(newBook)

    book.save().then(() => {
        console.log("Book created")
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
    res.send();
})

app.delete("/book/:id", (req,res) =>{
    Book.findOneAndRemove(req.params.id).then(() =>{
        res.send()
    }).catch (err => {
        if(err){
            throw err;
        }
    })
})

app.listen(4000);