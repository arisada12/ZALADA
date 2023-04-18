import express from "express"
import cors from "cors"
import { sample_book, sample_tags, sample_users } from "./data"

const app = express()
app.use(express.json())

app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}))

app.get("/api/books", (req, res)=>{
    res.send(sample_book)
})

app.get("/api/books/search/:searchTerm", (req,res)=>{
    const searchTerm = req.params.searchTerm
    const books = sample_book.filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()))
    res.send(books)
})

app.get("/api/books/tags", (req,res)=>{
    res.send(sample_tags)
})

app.get("/api/books/tag/:tagName", (req,res)=>{
    const tagName = req.params.tagName
    const books = sample_book.filter(book => book.tags?.includes(tagName))
    res.send(books)
})

app.get("/api/books/:bookId", (req,res)=>{
    const bookId = req.params.bookId
    const book = sample_book.find(book => book.id == bookId)
    res.send(book)
})

app.post("/api/users/login", (req,res)=>{
    const {email, password} = req.body
    const user = sample_users.find(user => user.email === email && user.password === password)
})

const port = 5000

app.listen(port, ()=>{
    console.log("Listening server from http://localhost:" + port)
})