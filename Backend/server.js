import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import {Server} from 'socket.io'
import { log } from 'console'


const app = express()
const server = http.createServer(app)

//initializing socket server
export const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

//store online user
export const userSocketMap = {} //{userId :socketId}

//socket connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    console.log(("user connected", userId));

    if(userId) userSocketMap[userId] = socket.id

    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("User Disconnested", userId);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
        
    })
})

app.use(express.json({limit: "4mb"}))
app.use(cors())

app.use("/api/status", (req, res) => res.send("Server is live"))
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/messages", messageRouter)

await connectDB()

const PORT = process.env.PORT || 5745

server.listen(PORT, () => console.log("Server in running on port:" + PORT))