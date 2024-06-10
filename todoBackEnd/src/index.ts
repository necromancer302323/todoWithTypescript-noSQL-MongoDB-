
import express, { NextFunction, Request, Response } from 'express'
import cors from "cors"
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
const jwtPassword='1234'

const app=express()
const port=4000
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const prisma = new PrismaClient();





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
    const todos = await prisma.todo.findMany({
        where:{user_id:userId}
    })
    res.send(todos)
})

app.post('/addTodos',authentication, async (req,res)=>{
    //@ts-ignore
  const userId=req.userId
    await prisma.todo.create({
        data:{
            title:req.body.title,
            description:req.body.description,
            user_id:userId
        }
    })
    const todos = await prisma.todo.findMany({
        where:{user_id:userId}
    })
    res.send(todos)
})

app.post('/deleteTodo', authentication,async(req,res)=>{
  //@ts-ignore
  const userId=req.userId
  await prisma.todo.delete({
        where:{title:req.body.title}
    })
    const todos = await prisma.todo.findMany({
        where:{user_id:userId}
    })
    res.send(todos)
    })
    app.post('/updateTodo',authentication,async(req,res)=>{
        //@ts-ignore
        const userId=req.userId
     await prisma.todo.update({
        where:{id:req.body.id,user_id:userId},
        data:{
            title:req.body.title,
            description:req.body.description
        }
    })
    const todos = await prisma.todo.findMany({
        where:{user_id:userId}
    })
    res.send(todos)
    })

app.post('/signup',async (req,res)=>{
     //@ts-ignore
    let userOrNot = await prisma.user.findUnique({
        where:{username:req.body.username}
    })
    console.log(req.body.username)
     if(userOrNot==null){
        await  prisma.user.create({
            data:{
                username:req.body.username,
                password:req.body.password
            }
        })
        res.send("account created ")
  
     }else{
        res.send("you already have a account in this website")
     }
})
app.post('/login',async(req,res)=>{
    let userOrNot =await prisma.user.findFirst({
        where:{username:req.body.username}
    })
    const userId=userOrNot?.id
    var token=await jwt.sign({userId},jwtPassword)
    console.log(token)
            if(userOrNot==null){
                res.send("you dont have a account in this website")
            }else{ 
                res.send(token)
            } 
})


app.listen(port,()=>{console.log(`listening at http://localhost:${port}`)})