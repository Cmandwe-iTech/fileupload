const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const user_Router = require("./routes/userRoute")
const file_router = require("./routes/fileRoute")
const app = express()
const port = 5000
app.use(express.json())
app.use(bodyparser.json())
app.use(cors())

mongoose.connect("mongodb+srv://chhatrapati:mandwe@cluster0.mwzmddi.mongodb.net/?retryWrites=true&w=majority").then((res)=>{
    console.log("connected to db")
})
app.use("/fileupload", async(req,res,next)=>{
    try{
        const token = req.headers.authorization;
        console.log(token);
        if(token){
            const decoded = jwt.verify(token, "secret");
            req.user = decoded.data;
            next();
        }else{
            res.status(401).json({
                status:"failed",
                message:"token is missing"
            })
        }
    }catch(e){
        res.status(401).json({
            status:"failed",
            message:e.message
        })
    }
})
app.use("/", user_Router)
app.use("/", file_router)
app.listen(port, ()=>{
    console.log(`server started on ${port}`);
})