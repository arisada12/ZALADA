import dotenv from "dotenv"
dotenv.config();
import path from "path"
const express = require("express")
import cors from "cors"
import bookRouter from "./routers/book.router"
import userRouter from "./routers/user.router"
import orderRouter from "./routers/order.router"
import { dbConnect } from "./config/database.config";
dbConnect()

const app = express()
app.use(express.json())

app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}))

app.use("/api/books", bookRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
app.use(express.static("public"))

app.get("*", (req:any,res:any)=>{
    res.sendFile(path.join(__dirname, "/public", "index.html"))
})

const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log("Listening server from http://localhost:" + port)
})