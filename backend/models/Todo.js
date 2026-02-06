const mongoose=require('mongoose');

const todoschema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
        },
        // status: 'pending' or 'completed' (preferred)
        status:{
            type:String,
            enum:["pending","completed"],
            default:"pending"
        },
        // backward-compatible completed boolean
        completed:{
            type:Boolean,
            default:false
        },
        priority:{
            type:String,
            enum:["high","medium","low"],
            default:"medium"
        },
        dueDate:{
            type:Date,
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Task", todoschema);