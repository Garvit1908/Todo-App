const mongoose = require("mongoose");
require("dotenv").config();


const connectdb=()=>{

    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log('db connected succesfully'))
    .catch((err)=>{
        console.log(err)
        process.exit(1);
    })
    
}

module.exports=connectdb;