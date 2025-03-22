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

const __dirname = path.resolve();
app.use('/uploads', express.static('/var/data/uploads'));
app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
);

export  {app};