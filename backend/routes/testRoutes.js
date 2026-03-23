import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/",  (req,res)=>{
   res.send("Test route is working")
   })


export default router