import express from "express"
import cookieParser from 'cookie-parser'



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Hello from server");
})


import userRouter from "./routes/register.route.js"

app.use("/api/user",userRouter);


export  {app};