const express=require('express');
const connectdb = require("./config/database");
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes");

const app=express();
app.use(express.json())
app.use(cors());

require('dotenv').config();


const PORT=process.env.PORT;

app.get('/',(req,res)=>{
    res.send("haa meri jaaannn")
})

app.post('/user',(req,res)=>{
    console.log(req.body);
    res.send("user created succesfully");
})

connectdb();
app.use("/api/v1", todoRoutes);

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})
