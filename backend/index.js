import express from "express";
import mongoose from "mongoose";
import { PORT, DB } from "./config.js";
import { Book } from "./models/booksmodel.js";

const app = express();

mongoose.connect(DB).then(() => {
    console.log('connected to database')
}).catch((err) => {
    console.log(err)
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to server homePage')
})

// route to get all the books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({ count: books.length, data: books })
    }
    catch (err) {
        console.log(err)
    }
})
// route to get books by id
app.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id)
        return res.status(200).json(book)
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }
})
//route for update the book
app.put('/books/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Fill all required field" })
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(400).json({message: "Book not found"})
        }
        return res.status(200).json({message: 'Book information updated succesfully.'})
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send({ message: err.message })
    }
})

// post book to db
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Fill all required field" })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook)
        return res.status(200).send(book);
    }
    catch (err) {
        console.log(err)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`)
})
