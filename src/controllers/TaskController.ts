import mongoose, { isValidObjectId } from "mongoose";
import Task from "../models/Task";
import {NextFunction , Request, Response } from "express"
import { authentification } from "../helpers/authentication";



export const createTask = async (req :Request, res : Response) =>
{
    

    try {
        let { title, status, description, due_date, project_id } = req.body;
        if (!title || !status || !project_id) {
          return res
            .status(400)
            .json({ message: "title, project_id and status are required" });
        }
  
       const task = new Task();
       task.title = title;
       task.description = description;
       task.project = project_id;
       task.status = status;
       const created_task = await task.save();

   
        return res.status(200).json({ message: "task created successfully", data :created_task});
      } catch (error) {
        return res.status(400).json({ message: "error creating task", err:error.message });
      }

}

export const updateTask = async (req :Request, res : Response) =>{


    try {
        
        let { title, status, description, due_date } = req.body;
        if (!title || !status) {
          return res
            .status(400)
            .json({ message: "title, and status are required" });
        }

        const id = req.params.id;
        if(!id)
        {
            return res
            .status(400)
            .json({ message: "id is parameter required" });
        }

        if(!isValidObjectId(id))
        {
            return res
            .status(400)
            .json({ message: "invalid task id" });
        }
      

       const task = await Task.findById(id);
       console.log(task);

       if(task == null)
       {
        return res
            .status(400)
            .json({ message: "task not found" });
       }

       if(task.owner != req["currentUser"].id)
       {
        return res
            .status(400)
            .json({ message: "you don not have the privilege to edit this post" });
       }
    
   
}

/*export const deleteTask = async (req :Request, res : Response) =>{

    const {id} = req.params;
    console.log(id);
    try{
     const pr = await task.findById(id);
  
     if(pr == null){ 
       return res.status(400).json({success:false, message:'product not found'})
     } 
     
     if(pr.owner != req["currentUser"].id)
        {
         return res
             .status(400)
             .json({ message: "you don not have the privilege to delete this task" });
        }

     pr.deleted_at  = new Date();

     try{
        const soft_deleted = await pr.save();
        return res.status(200).json({success:true, message:'product deleted'})
     }
     catch(error)
     {
        console.log(pr)
        return res.status(400).json({success:false, message:'product not found....', err:error, data:pr})
     }

     
    }
    catch(err)
    {
       res.status(400).json({success:false, message:'product not found..', err:err.message })
    }
   
}

export const viewTaskById = async (req :Request, res : Response) =>{
    const {id} = req.params;
    try{
        
     const pr = await task.findById(id);
     if(!pr){ 
        res.status(400).json({success:false, message:'product not found'})
     }  
     
     if(pr.owner != req["currentUser"].id)
        {
         return res
             .status(400)
             .json({ message: "you don not have the privilege to view this task" });
        }
     
    res.status(200).json({success:true, message:'task fetched', 'data':pr})
    }
    catch(err)
    {
       res.status(400).json({success:false, message:'error getting task', error:err.message})
    }
}

export const viewUserTasks = async (req :Request, res : Response) =>{
   
    const {id} = req.params;
    try{
        
     const pr = await Task.find({owner:id, deleted_at:null});
     if(!pr){ 
        res.status(400).json({success:false, message:'tasks not found'})
     }  
     
     
     
    res.status(200).json({success:true, message:'task fetched', 'data':pr})
    }
    catch(err)
    {
       res.status(400).json({success:false, message:'error getting task', error:err.message})
    }
}

*/
