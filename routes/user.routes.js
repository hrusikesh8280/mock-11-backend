const express = require('express')
const UserRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/user')


UserRouter.post("/api/register",async(req,res)=>{
    const {name,email,password} = req.body
    try{
        const oldUser = await UserModel.exists({email})
        if(oldUser){
            return res.status(400).json({message:"User already exists"})
    }else{
        bcrypt.hash(password,5,async(err,hash)=>{
            const newUser = new UserModel({email,password:hash,name})
            await newUser.save()
            res.status(201).json({message:"User created",newUser})
        })
    }

    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})


UserRouter.post("/api/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    res.status(201).send({"msg":"Login successfull!","token":jwt.sign({"userId":user._id},"b213018")})
                }else{
                    res.status(400).json({message:"Invalid credentials"})
                }
            })
        }else{
            res.status(400).json({message:"No Such User Exist"})
        }
        
    }catch(err){
        res.status(500).json({message:"Internal server error"})
    }
})



module.exports={UserRouter}