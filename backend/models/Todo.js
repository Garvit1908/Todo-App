const mongoose=require('mongoose');

const todoschema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true,
        },
        completed:{
            type:Boolean,
            default:false
        }
        
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model("Todo", todoschema);