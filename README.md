# 🖍️ Collaborative Whiteboard App

A real-time collaborative whiteboard built with **React**, **Socket.io**, and **Fabric.js**, supporting **multiple rooms** for isolated collaboration. Users can draw, erase, and share whiteboards across tabs and devices instantly.

---
## 🔗 Live Demo

🌐 website: [VisionPad](https://visionpad.netlify.app/)
---

## ✨ Features

- 🎨 Live collaborative drawing
- 🔒 Room-based session separation
- 🖌️ Adjustable brush color & width
- 🧽 Eraser tool and canvas clearing
- ⚡ Real-time sync across users
- 💻 Responsive and clean UI (TailwindCSS)

---

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS, Fabric.js, Socket.io-client
- **Backend**: Node.js, Express, Socket.io

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ayush-Sareen/Colaborative-WhiteBoard.git
cd collaborative-whiteboard
```
2. Install dependencies
Frontend:

```bash

cd frontend
npm install
```
Backend:

```bash

cd ../backend
npm install
```
🧪 Run Locally

Start Backend
```bash

cd backend
node index.js
```
Start Frontend
```bash
cd ../frontend
npm run dev
Visit http://localhost:5173
```


📂 Project Structure
```
collaborative-whiteboard/
│
├── backend/
│   └── index.js (Socket.io + Express server)
│
├── frontend/
│   ├── App.jsx
│   ├── Room.jsx
│   └── main.jsx
```
🧠 Learnings
Managing canvas state with Fabric.js

Broadcasting events to specific Socket.io rooms

Dealing with canvas updates before user interaction

Ensuring smooth real-time experience across devices
