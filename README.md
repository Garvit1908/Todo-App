📌 Taskify – Task Management Web Application

This repository contains a full-stack Task Management application (MERN-like) with support for task priority, due dates, and separate Pending / Completed views. The UI was refactored from a Todo app to a Task-focused UX.

Key features

- Add tasks with: title, priority (high / medium / low), and due date
- Pending and Completed sections (tasks default to "pending")
- Pending tasks sorted by priority: High → Medium → Low
- Mark tasks completed or move them back to pending
- Clear Completed — remove all completed tasks at once
- Priority badges with color coding (High: red, Medium: yellow, Low: green)
- Clean, responsive UI using React + Tailwind

Tech stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB, Mongoose

API (server base: http://localhost:3000/api/v1)

- GET /todos — list all tasks
- POST /todos — create task (body: `{ title, description?, priority, dueDate, status }`)
- GET /todos/:id — fetch single task
- PUT /todos/:id — update task fields
- DELETE /todos/:id — delete one task
- PUT /todos/toggle/:id — toggle task status (pending ↔ completed)
- DELETE /todos/completed — delete all completed tasks

Run locally

1. Start the backend

```bash
cd backend
npm install
npm run start
```

2. Start the frontend app

```bash
cd frontend/todo
npm install
npm run dev
```

Open the app at http://localhost:5173 (Vite default) or the URL shown by the dev server.

Notes

- The frontend still uses the existing `/api/v1/todos` routes for compatibility; the UI refers to items as "tasks".
- New task objects include: `id` (or `_id`), `title`, `status` ("pending"|"completed"), `priority` ("high"|"medium"|"low"), and `dueDate` (ISO date).

Future improvements

- User accounts and per-user tasks
- Filters, search, and pagination
- Deployment and CI

Author

Garvit

If this project helped you, a star is appreciated ⭐