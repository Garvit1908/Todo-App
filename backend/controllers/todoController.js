const Task = require("../models/Todo");

exports.createToDo=async(req,res)=>{
    try{
        const{title,description,priority,dueDate,status} = req.body;
        const response=await Task.create(
            {
                title,
                description,
                priority: priority || "medium",
                dueDate: dueDate || null,
                status: status || "pending",
                completed: status === "completed" ? true : false
            }
        );
        res.status(201).json({
            success:true,
            data:response,
            message:"Task created succesfully"
        })
    }
    catch(error){
   console.log("CREATE TASK ERROR:",error);
   res.status(500).json({
      success:false,
      message:error.message
   });
}

}

exports.getAllTodos=async(req,res)=>{
    try{
        const todos=await Task.find();
        res.status(200).json({
            success:true,
            data:todos,
            message:"All tasks fetched successfully"
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
        const todo=await Task.findById(id);
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Task not found"
            })
        }
        res.status(200).json({
            success:true,
            data:todo,
            message:"Task fetched successfully"
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

        const {title,description,priority,dueDate,status}=req.body;
        const update = { title, description, priority, dueDate, status, updatedAt: Date.now() };
        if(status) update.completed = status === "completed";

        const todo=await Task.findByIdAndUpdate(
            id,
            update,
            { new:true }
        );
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Task not found"
            })
        }
        res.status(200).json({
            success:true,
            data:todo,
            message:"Task updated successfully"
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
        const todo=await Task.findByIdAndDelete(id);
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Task not found"
            })
        }
        res.status(200).json({
            success:true,
            message:"Task deleted successfully"
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

     const todo=await Task.findById(req.params.id);

     if(!todo){
         return res.status(404).json({message:"Task not found"});
     }

     // toggle status and completed for compatibility
     const newStatus = (todo.status && todo.status === "completed") ? "pending" : "completed";
     todo.status = newStatus;
     todo.completed = newStatus === "completed";

     await todo.save();

     res.status(200).json(todo);

 }
 catch(error){
     console.log(error);
     res.status(500).json(error.message);
 }
}

// Delete all completed tasks
exports.deleteCompletedTodos = async (req, res) => {
    try {
        const result = await Task.deleteMany({ $or: [{ status: 'completed' }, { completed: true }] });
        res.status(200).json({ success: true, deletedCount: result.deletedCount, message: 'Completed tasks deleted' });
    } catch (error) {
        console.log('DELETE COMPLETED ERROR:', error);
        res.status(500).json({ success: false, message: error.message, stack: error.stack });
    }
};
