import express from "express";
import { Book } from '../models/booksModel.js';

const router = express.Router();

// route to get all the books - read
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({ count: books.length, data: books })
    }
    catch (err) {
        console.log(err)
    }
})
// route to get books by id -read
router.get('/:id', async (req, res) => {
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
//route for update the book- update
router.put('/:id', async (req, res) => {
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

//route for delete the book - delete
router.delete('/:id', async(req, res)=>{
    try{
        const {id} =req.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return res.status(404).json({message: "Book not found"})
        }
        return res.status(200).json({message: "Book deleted succesfully."})
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({ message: err.message })
    }
})

// post book to db - create
router.post('/', async (req, res) => {
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

export default router;
