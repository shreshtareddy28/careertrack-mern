
import mongoose from "mongoose"
import Application from "../models/Application.js"

export const addApplication = async (req,res)=>{
   try{

      const {company,role,status,deadline,link,notes} = req.body

      const newApp = new Application({
         user: req.user.id,
         company,
         role,
         status,
         deadline,
         link,
         notes
      })

      await newApp.save()

      res.status(201).json(newApp)
      console.log("Application saved:", newApp)

   }catch(error){
      res.status(500).json({error:error.message})
   }
}

export const getApplications = async (req,res)=>{
   try{

      const apps = await Application.find({user:req.user.id})

      res.json(apps)

   }catch(error){
      res.status(500).json({error:error.message})
   }
}

export const updateApplication = async (req,res)=>{
   try{

      const app = await Application.findById(req.params.id)

      if(!app){
         return res.status(404).json({message:"Application not found"})
      }

      if(app.user.toString() !== req.user.id){
         return res.status(401).json({message:"Not authorized"})
      }

      const updatedApp = await Application.findByIdAndUpdate(
         req.params.id,
         req.body,
         {new:true}
      )

      res.json(updatedApp)

   }catch(error){
      res.status(500).json({error:error.message})
   }
}


export const deleteApplication = async (req,res)=>{
   try{

      const app = await Application.findById(req.params.id)

      if(!app){
         return res.status(404).json({message:"Not found"})
      }

      if(app.user.toString() !== req.user.id){
         return res.status(401).json({message:"Not authorized"})
      }

      await app.deleteOne()

      res.json({message:"Application removed"})

   }catch(error){
      res.status(500).json({error:error.message})
   }
}

export const getStats = async (req,res)=>{
   try{

      const stats = await Application.aggregate([
         {
            $match:{user: new mongoose.Types.ObjectId(req.user.id)}
         },
         {
            $group:{
               _id:"$status",
               count:{$sum:1}
            }
         }
      ])

      res.json(stats)

   }catch(error){
      res.status(500).json({error:error.message})
   }
}