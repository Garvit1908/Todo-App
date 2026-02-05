const Todo = require("../models/Todo");

exports.createToDo=async(req,res)=>{
    try{

        const{title,description}=req.body;
        const response=await Todo.create(
            {
                title,
                description
            }
        );
        res.status(201).json({
            success:true,
            data:response,
            message:"Todo created succesfully"
        })
    }
    catch(error){
   console.log("CREATE TODO ERROR:",error);   // ⭐ important
   res.status(500).json({
      success:false,
      message:error.message
   });
}

}

exports.getAllTodos=async(req,res)=>{
    try{
        const todos=await Todo.find();
        res.status(200).json({
            success:true,
            data:todos,
            message:"All todos fetched successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

exports.getTodoById=async(req,res)=>{
    try{
        const id=req.params.id;
        const todo=await Todo.findById(id);
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            })
        }
        res.status(200).json({
            success:true,
            data:todo,
            message:"Todo fetched successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


exports.updateTodo=async (req,res)=>{
    try{
        const id=req.params.id;

        const {title,description}=req.body;
        const todo=await Todo.findByIdAndUpdate(
            id,
            { title, description, updatedAt: Date.now() },
            { new:true }
        );
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            })
        }
        res.status(200).json({
            success:true,
            data:todo,
            message:"Todo updated successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


exports.deleteTodo=async(req,res)=>{
    try{
        const id=req.params.id;
        const todo=await Todo.findByIdAndDelete(id);
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Todo deleted successfully"
        })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


exports.toggleTodo=async(req,res)=>{
 try{

   const todo=await Todo.findById(req.params.id);

   if(!todo){
     return res.status(404).json({message:"Todo not found"});
   }

   todo.completed=!todo.completed;

   await todo.save();

   res.status(200).json(todo);

 }
 catch(error){
   console.log(error);
   res.status(500).json(error.message);
 }
}
