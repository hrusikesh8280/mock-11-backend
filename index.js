const express = require("express")
const { connection } = require("./db")
const { UserRouter } = require("./routes/user.routes")
const { Booksrouter } = require("./routes/books.routes")
const { OrderRouter } = require("./routes/order.routes")



const app = express()
app.use(express.json())

app.use("/",UserRouter)
app.use("/",Booksrouter)
app.use("/",OrderRouter)


app.listen(9007,async()=>{
    try{
        await connection
        console.log("Server mongoose Started")

    }catch(err){
        console.log(err);
    }
    console.log("Server is Running at 9007");
})