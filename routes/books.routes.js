const express = require("express")
const Booksrouter = express.Router()
const jwt = require("jsonwebtoken");
const BookModel = require("../models/book");
const { auth } = require("../middleware/auth");


Booksrouter.get("/api/books",async(req,res)=>{
    const {category,auther} = req.query;
    const filter ={}

    if(category){
        filter.category = category
    }
    if(auther){
        filter.auther = auther
    }
    const books = await BookModel.find(filter)
    res.status(200).json({books})
})

Booksrouter.get("/api/books/:id",async(req,res)=>{
    const {id} = req.params;
    const book = await BookModel.findById(id)
    if(!book){
        return res.status(404).json({message:"book not found"})
    }
    res.status(200).json({book})
})



Booksrouter.post("/api/books",auth,async(req,res)=>{

    const payload = req.body
    try{
            const book = new BookModel(payload)
            await book.save()
            // res.status(201).json({message:"book created successfully"})
            res.status(201).json({book})
    }catch(err){
        res.status(400).json({message:err.message})
    }
})


Booksrouter.delete("/api/books/:id", auth, async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBook = await BookModel.findByIdAndDelete(id);
      if (!deletedBook) {
        return res.status(404).json({ message: "book not found" });
      }
      res.status(202).json({ message: "book deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


  Booksrouter.patch("/api/books/:id", auth, async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const userid=req.body.userId
    try {
      const updatedBook = await BookModel.findByIdAndUpdate({_id:id,userId:userid},{$set:data});
      res.status(204).send(JSON.stringify(updatedBook))
      if (!updatedBook) {
        return res.status(404).json({ message: "book not found" });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


module.exports={Booksrouter}