import dotenv from "dotenv"
dotenv.config();
import path from "path"
import express from "express"
import cors from "cors"
import bookRouter from "./routers/book.router"
import userRouter from "./routers/user.router"
import orderRouter from "./routers/order.router"
import { dbConnect } from "./config/database.config";
dbConnect()

const app = express()
app.use(express.json())

//fix cors issue
app.use(cors({
    credentials: true,
    origin:["*"]
}))

app.use("/api/books", bookRouter)
app.use("/api/users", userRouter)
app.use("/api/orders", orderRouter)
app.use(express.static("public"))

//Display frontend when deployment is execute in master branch, but in my case this not necessery because I deployed frontend and backend separately
app.get("*", (req:any,res:any)=>{
    res.sendFile(path.join(__dirname, "/public", "index.html"))
})

const port = process.env.PORT || 5000

//If this doesn't work just change the start script in package.json (backend) to cd src && node (or nodemon though, it's up to you) server
app.listen(port, ()=>{
    console.log("Listening server from http://localhost:" + port)
})