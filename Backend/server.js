import express from 'express'
import "dotenv/config"
import cors from 'cors'
import http from 'http'
import { connectDB } from './lib/db.js'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoutes.js'


const app = express()
const server = http.createServer(app)

app.use(express.json({limit: "4mb"}))
app.use(cors())

app.use("/api/status", (req, res) => res.send("Server is live"))
app.use("/api/v1/auth", userRouter)
app.use("/api/v1/messages", messageRouter)

await connectDB()

const PORT = process.env.PORT || 5745

server.listen(PORT, () => console.log("Server in running on port:" + PORT))