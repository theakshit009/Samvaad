# 💬 Samvaad — Real-time Chat Application

Samvaad is a modern, full-stack real-time chat application designed to offer a seamless and engaging messaging experience — built from scratch using the MERN stack and Socket.IO.

> “Samvaad” (संवाद) means “conversation” — because meaningful communication should be fast, fluid, and beautiful.

---

## 🚀 Features

- 🔐 **Secure Authentication** – JWT-based auth with protected routes
- 🧑‍🤝‍🧑 **User-to-User Messaging** – Real-time one-on-one chat
- 🟢 **Online/Offline Status** – Track user presence via Socket.IO
- 📸 **Image Sharing** – Upload and send images (Cloudinary integration)
- ✅ **Seen/Unseen Indicators** – Smart message status handling
- 🌐 **Fully Responsive UI** – Works across all screen sizes
- 🔒 **Protected Endpoints** – Token-based API access

---

## 🛠️ Tech Stack

### 🔹 Frontend
- **React.js** (with Context API)
- **Vite** for lightning-fast development
- **React Hot Toast** for clean notifications
- **Tailwind CSS** for utility-first styling

### 🔹 Backend
- **Node.js** & **Express.js**
- **MongoDB** with Mongoose
- **Socket.IO** for real-time communication
- **Cloudinary** for image uploads
- **JWT** for secure authentication

---

## 📁 Project Structure
```
samvaad/
├── client/ # React frontend
│ ├── components/
│ ├── context/
│ ├── pages/
│ └── assets/
├── server/ # Express backend
│ ├── controllers/
│ ├── model/
│ ├── routes/
│ ├── lib/
│ └── middlewares/
└── README.md
```

## 🔧 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/theakshit009/Samvaad.git
cd Samvaad
```
### 2. Setup the backend
```bash
cd server
npm install
# Create a .env file (see .env.example)
npm run dev
```
### 3. Setup the frontend
``` bash
cd ../client
npm install
npm run dev
```
<img width="2862" height="1694" alt="image" src="https://github.com/user-attachments/assets/d60c46f8-1a4a-4e25-9847-f88bb1ee5653" />
⭐ Support the Project
If you liked Samvaad, consider giving it a ⭐ on GitHub and sharing it with your network!



