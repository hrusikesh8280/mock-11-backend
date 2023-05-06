const express = require ("express")
const OrderRouter = express.Router()
const jwt = require("jasonwebtoken")
const { auth } = require("../middleware/auth")


OrderRouter.post("/api/orders",auth ,async(req,res)=>{
    try {
        const { books } = req.body;
        const user = req.user._id;

        const bookDetails = await BookModel.find({ _id: { $in: books } }, { _id: 1, price: 1 });
        const totalAmount = bookDetails.reduce((acc, cur) => acc + cur.price, 0);

        const order = new OrderModel({ user, books, totalAmount });
        await order.save();

        res.status(201).json({ message: "Order created successfully" });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
})

OrderRouter.get("/api/orders", auth, async(req, res) => {
    try {
  
      const orders = await OrderModel.find()
        .populate({ path: "user", select: "_id name email" })
        .populate({ path: "books", select: "_id title author price" });
  
      res.status(200).json({ orders });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  module.exports = {OrderRouter };