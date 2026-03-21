import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const dbConnect=async()=>{
    (await mongoose.connect(process.env.MONGO_URI))
    }

export default dbConnect