import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import { PORT, DB } from "./config.js";
import bookRoutes from './routes/bookRoutes.js'

const app = express();

mongoose.connect(DB).then(() => {
    console.log('connected to database')
}).catch((err) => {
    console.log(err)
})

app.use(express.json())
//allow all origins to use cors
app.use(cors())
//allow only defined to use cors
// app.use(cors({
//     origin:'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }))

app.use('/books', bookRoutes)

app.get('/', (req, res) => {
    res.send('Welcome to server homePage')
})


app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`)
})
