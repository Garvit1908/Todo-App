import {useState,useEffect} from "react";
import axios from "axios";

const Todo=()=>{

    const[todo,settodo]=useState([]);
    const[input,setinput]=useState("");

    const getTodos=async()=>{
        try{
            const res=await axios.get("http://localhost:3000/api/v1/todos");
            settodo(res.data.data);
        }
        catch(err){
            console.log(err);
        }
    };

    const addTodo=async()=>{
        if(input.trim()==="")return;
        try{
            await axios.post("http://localhost:3000/api/v1/todos",{
                title:input,
                description:input
            });
            setinput("");
            getTodos();
        }
        catch(err){
            console.log(err);
        }
    };

    const deleteTodo=async(id)=>{
        try{
            await axios.delete(`http://localhost:3000/api/v1/todos/${id}`);
            getTodos();
        }
        catch(err){
            console.log(err);
        }
    };

    const toggleTodo=async(id)=>{
        try{
            await axios.put(`http://localhost:3000/api/v1/todos/toggle/${id}`);
            getTodos();
        }
        catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getTodos();
    },[]);

    function handler(e){
        if(e.key==="Enter")addTodo();
    }

    return(
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            placeholder="Enter a New Todo..."
                            onChange={(e)=>setinput(e.target.value)}
                            onKeyDown={handler}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                            onClick={addTodo}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                            Add Todo
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    {todo.length===0?(
                        <p className="text-center text-gray-400 py-8">
                            No Todos Yet. Add one to get started...
                        </p>
                    ):(
                        <ul className="space-y-3">
                            {todo.map(t=>(
                                <li
                                    key={t._id}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={t.completed || false}
                                        onChange={()=>toggleTodo(t._id)}
                                    />

                                    <span className={`flex-1 ${t.completed?"line-through text-gray-400":"text-gray-700"}`}>
                                        {t.title}
                                    </span>

                                    <button
                                        onClick={()=>deleteTodo(t._id)}
                                        className="text-red-500 opacity-0 group-hover:opacity-100"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Todo;
