
import express, { NextFunction, Request, Response } from 'express'
import cors from "cors"
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const jwtPassword='1234'

const app=express()
const port=4000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


 await mongoose.connect("mongodb+srv://admin:aakash2000@cluster0.sw7aqpb.mongodb.net/todo")




const usersSchema = new mongoose.Schema({
    username: String,password: String,todo:[{name: String,description: String}]
})


const User =  mongoose.model('User', usersSchema);



async function authentication(req:Request,_res:Response,next:NextFunction){
    const token:any = req.headers.authorization;
    let decode= await jwt.verify(token,jwtPassword)
    //@ts-ignore
    req.userId=decode.userId
    next()
}

app.get('/allTodos',authentication ,async (req,res)=>{
    //@ts-ignore
    const userId=req.userId
    const todos = await User.findOne({_id:userId})
    res.send(todos?.todo)
})

app.post('/addTodos',authentication, async (req,res)=>{
    //@ts-ignore
  const userId=req.userId
  // const todos = await User.findOne({_id:userId})
      await User.updateOne({_id:userId},{"$set":{todo:req.body.newTodo}})
      const updatedUser = await User.findOne({_id:userId})
      res.send(updatedUser?.todo) 
})

app.post('/deleteTodo', authentication,async(req,res)=>{
  //@ts-ignore
  const userId=req.userId
  // const todos = await User.findOne({_id:userId})
      await User.updateOne({_id:userId},{"$set":{todo:req.body.newTodo}})
      const updatedUser = await User.findOne({_id:userId})
      res.send(updatedUser?.todo) 
    })
app.post('/updateTodo',authentication,async(req,res)=>{
    //@ts-ignore
    const userId=req.userId
    // const todos = await User.findOne({_id:userId})
        await User.updateOne({_id:userId},{"$set":{todo:req.body.newTodo}})
        const updatedUser = await User.findOne({_id:userId})
        res.send(updatedUser?.todo)
})

app.post('/signup',async (req,res)=>{
    let userOrNot = await User.findOne(req.body)
    if(userOrNot==null){
        let username= req.body.username
        await  User.create(req.body)
        res.send("account created "+username)
    }else{
        res.send("you already have a account in this website")
    }
})
app.post('/login',async(req,res)=>{
    let userOrNot = await User.findOne(req.body)
    const userId=userOrNot?._id
    var token=await jwt.sign({userId},jwtPassword)
    console.log(token)
            if(userOrNot==null){
                res.send("you dont have a account in this website")
            }else{ 
                res.send(token)
            } 
})


app.listen(port,()=>{console.log(`listening at http://localhost:${port}`)})