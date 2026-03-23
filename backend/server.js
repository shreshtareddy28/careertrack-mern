import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import testRoutes from "./routes/testRoutes.js"
import applicationRoutes from "./routes/applicationRoutes.js"

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.options("/*", cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/test", testRoutes)
app.use("/api/applications", applicationRoutes)
app.get("/", (req, res) => {
  res.send("CareerTrack API is running ")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
   console.log(`Server running on port ${PORT}`)
})