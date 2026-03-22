import express from "express"
import {addApplication,getApplications} from "../controllers/applicationController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import {updateApplication} from "../controllers/applicationController.js"
import {deleteApplication} from "../controllers/applicationController.js"
import {getStats} from "../controllers/applicationController.js"
import Application from "../models/Application.js"

const router = express.Router()
router.get("/stats", authMiddleware, async (req,res)=>{
  try{

    const stats = await Application.aggregate([
      {
        $match: { user: req.user.id }
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])

    res.json(stats)

  }catch(error){
    res.status(500).json({message:"Error fetching stats"})
  }}
)

router.post("/", authMiddleware, addApplication)
router.get("/", authMiddleware, getApplications)
router.get("/stats", authMiddleware, getStats)
router.put("/:id", authMiddleware, updateApplication)
router.delete("/:id", authMiddleware, deleteApplication)

export default router