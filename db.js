const mongoose = require("mongoose")


const connection = mongoose.connect("mongodb+srv://hrusikeshviroot:hrusikesh@cluster0.rc7p5yv.mongodb.net/")
module.exports={connection}