import { Router } from "express"
import { sample_book, sample_tags } from "../data"
import asyncHandler from 'express-async-handler'
import { BookModel } from "../models/book.models"
const router = Router()

router.get("/seed", asyncHandler(
    async (req:any, res:any) => {
        const booksCount = await BookModel.countDocuments()
        if (booksCount >0){
            res.send("Seed is already done!")
            return
        }
        await BookModel.create(sample_book)
        res.send("Seed is done!")
    }
))

router.get("/", asyncHandler(
    async(req:any, res:any)=>{
        const books = await BookModel.find()
        res.send(books)
    }
))

router.get("/search/:searchTerm", asyncHandler(
    async(req:any,res:any)=>{
        const searchRegex = RegExp(req.params.searchTerm, "i")
        const books = await BookModel.find({name: {$regex:searchRegex}})
        res.send(books)
    }
))

router.get("/tags", asyncHandler(
    async(req:any,res:any)=>{
        const tags = await BookModel.aggregate([
            {
                $unwind: "$tags"
            },
            {
                $group:{
                    _id: "$tags",
                    count: {$sum: 1}
                }
            },
            {
                $project:{
                    _id: 0,
                    name: "$_id",
                    count: "$count"
                }
            }
        ]).sort({count: -1})
        const all = {
            name: "All",
            count: await BookModel.countDocuments()
        }
        tags.unshift(all)
        res.send(tags)
    }
))

router.get("/tag/:tagName", asyncHandler(
    async(req:any,res:any)=>{
        const books = await BookModel.find({tags: req.params.tagName})
        res.send(books)
    }
))

router.get("/:bookId", asyncHandler(
    async (req:any,res:any)=>{
        const book = await BookModel.findById(req.params.bookId)
        res.send(book)
    }
))

export default router