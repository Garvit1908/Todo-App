import { useState, useEffect } from "react";
import axios from "axios";

const priorityOrder = { high: 1, medium: 2, low: 3 };

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const getTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/todos");
      setTasks(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async () => {
    if (title.trim() === "") return;
    try {
      await axios.post("http://localhost:3000/api/v1/todos", {
        title: title,
        priority: priority,
        dueDate: dueDate,
        status: "pending",
      });
      setTitle("");
      setPriority("medium");
      setDueDate("");
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/todos/${id}`);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleTask = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/todos/toggle/${id}`);
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  function handleKey(e) {
    if (e.key === "Enter") addTask();
  }

  const formatDate = (d) => {
    if (!d) return "No due date";
    try {
      return new Date(d).toLocaleDateString();
    } catch (e) {
      return d;
    }
  };

  const getStatus = (t) => {
    if (t.status) return t.status;
    if (typeof t.completed !== "undefined") return t.completed ? "completed" : "pending";
    return "pending";
  };

  const pending = tasks
    .filter((t) => getStatus(t) === "pending")
    .sort((a, b) => (priorityOrder[a.priority || "medium"] || 2) - (priorityOrder[b.priority || "medium"] || 2));

  const completed = tasks.filter((t) => getStatus(t) === "completed");

  const deleteCompleted = async () => {
    try {
      const res = await axios.delete("http://localhost:3000/api/v1/todos/completed");
      if (res && res.data && res.data.success) {
        getTasks();
        return;
      }
    } catch (err) {
      console.log('Bulk delete failed, falling back to per-item deletes', err && err.response ? err.response.data : err);
    }

    // Fallback: delete each completed task individually
    try {
      const completedTasks = tasks.filter((t) => getStatus(t) === "completed");
      await Promise.all(
        completedTasks.map((t) => axios.delete(`http://localhost:3000/api/v1/todos/${t._id || t.id}`))
      );
      getTasks();
    } catch (err) {
      console.log('Fallback per-item delete failed', err);
    }
  };

  const priorityBadge = (p) => {
    const v = (p || "medium").toLowerCase();
    const base = "px-2 py-0.5 rounded-full text-xs font-semibold";
    if (v === "high") return <span className={`${base} bg-red-100 text-red-700`}>High</span>;
    if (v === "medium") return <span className={`${base} bg-yellow-100 text-yellow-800`}>Medium</span>;
    return <span className={`${base} bg-green-100 text-green-700`}>Low</span>;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              value={title}
              placeholder="Enter a new task..."
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleKey}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg min-w-30"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex items-end">
              <button
                onClick={addTask}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Pending Tasks</h2>
          {pending.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No pending tasks.</p>
          ) : (
            <ul className="space-y-3">
              {pending.map((t) => (
                <li
                  key={t._id || t.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 group"
                >
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={() => toggleTask(t._id || t.id)}
                  />

                  <span className="flex-1 text-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{t.title}</span>
                      <div className="flex items-center gap-2">
                        {priorityBadge(t.priority)}
                        <span className="text-sm text-gray-500">{formatDate(t.dueDate || t.dueDate || t.due_date)}</span>
                      </div>
                    </div>
                  </span>

                  <button
                    onClick={() => deleteTask(t._id || t.id)}
                    className="text-red-500 opacity-0 group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Completed Tasks</h2>
            <button
              onClick={deleteCompleted}
              className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
            >
              Clear Completed
            </button>
          </div>
          {completed.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No completed tasks yet.</p>
          ) : (
            <ul className="space-y-3">
              {completed.map((t) => (
                <li
                  key={t._id || t.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 text-gray-400"
                >
                  <input
                    type="checkbox"
                    checked={true}
                    onChange={() => toggleTask(t._id || t.id)}
                  />

                  <span className="flex-1 line-through">{t.title}</span>

                  <div className="flex items-center gap-2">
                    {priorityBadge(t.priority)}
                    <span className="text-sm text-gray-400">{formatDate(t.dueDate || t.due_date)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
