import express from "express"
import {addApplication,getApplications} from "../controllers/applicationController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import {updateApplication} from "../controllers/applicationController.js"
import {deleteApplication} from "../controllers/applicationController.js"
import {getStats} from "../controllers/applicationController.js"

const router = express.Router()

router.post("/", authMiddleware, addApplication)
router.get("/", authMiddleware, getApplications)
router.get("/stats", authMiddleware, getStats)
router.put("/:id", authMiddleware, updateApplication)
router.delete("/:id", authMiddleware, deleteApplication)

export default router