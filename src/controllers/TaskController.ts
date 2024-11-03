import mongoose, { isValidObjectId } from "mongoose";
import Task from "../models/Task";
import {NextFunction , Request, Response } from "express"
import { authentification } from "../helpers/authentication";
import Project from "../models/Project";



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
       task.due_date = due_date;
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

       //pull project
       const pr = await Project.findById(task.project);

       if(pr.owner != req["currentUser"].id)
       {
        return res
            .status(400)
            .json({ message: "you don not have the privilege to edit this task", owners: pr.owner, loggedIn:req["currentUser"].id, oo:pr.owner});
       }

       

       task.title = title;
       task.description = description;
       task.status = status;
       task.due_date = due_date;
       const created_task = await task.save();

   
        return res.status(200).json({ message: "task updated successfully", data :created_task});

    }
    catch(err)
    {
        res.status(400).json({success:false, message:'project not found..', err:err.message })
    }
    
   
}

export const deleteTask = async (req :Request, res : Response) =>{

            const {id} = req.params;

            try{
            const task = await Task.findById(id).populate({
                path:'project',
                select:'_id'
            }).lean();

            if(task == null){ 
            return res.status(400).json({success:false, message:'task not found'})
            } 



            const pr = await Project.findById(task.project);

            if(pr.owner  != req["currentUser"].id)
            {
            return res
                .status(400)
                .json({ message: "you don not have the privilege to delete this task"});
            }
            


            try{
                const task2 = await Task.findById(id)
                task2.deleted_at  = new Date();
                const soft_deleted = await task2.save();
                return res.status(200).json({success:true, message:'task deleted'})
            }
            catch(error)
            {
                
                return res.status(400).json({success:false, message:'task not found....', err:error, data:pr})
            }

            }
            catch(err)
            {
            res.status(400).json({success:false, message:'product not found..', err:err.message })
            }
   
}


export const viewTaskById = async (req :Request, res : Response) =>{
        const {id} = req.params;
        
            
        if(!isValidObjectId(id))
         {
                    return res
                    .status(400)
                    .json({ message: "invalid task id" });
         }

      
        
        try{

            const task1 = await Task.findById(id);
            if(!task1){ 
                res.status(400).json({success:false, message:'product not found'})
            }  

            const task = await Task.findById(id).populate({
            path:'project',
            select:'_id, name'
            }).lean();
    
            if(task == null){ 
            return res.status(400).json({success:false, message:'task not found'})
            } 
    
    
    
            const pr = await Project.findById(task.project);
    
            if(pr.owner  != req["currentUser"].id)
            {
            return res
                .status(400)
                .json({ message: "you don not have the privilege to view this task"});
            }
            
        
        res.status(200).json({success:true, message:'task fetched', 'data':task})
        }
        catch(err)
        {
        res.status(400).json({success:false, message:'error getting task', error:err.message})
        }
}

export const viewUserTasks = async (req :Request, res : Response) =>{
   
    const {project_id, status, due_date} = req.query;

    let {limit , page } = req.query;
    
    console.log(req.query)
    try{

        if(!limit){ limit = 3;}
        if(!page){ page = 1}
        
        const pr = await Project.findById(project_id);

        if(pr == null)
        {
            return res
            .status(400)
            .json({ message: "project not found"});
        }
    
        if(pr.owner  != req["currentUser"].id)
        {
        return res
            .status(400)
            .json({ message: "you don not have the privilege to view these tasks"});
        }
        
        //now I build

        const filter: { status?: string; due_date?: { $lte?: Date } , deleted_at?: Date } = {};

        if (status) {
            filter.status = status as string; 
          }
      
          if (due_date) {
            filter.due_date = { $lte: new Date(due_date as string) }; // Filter by date
          }
          
          filter.deleted_at = null;

          const skip = (page - 1) * limit;
          const tasks = await Task.find(filter).sort({ created_at: -1 }) 
          .limit(limit)
          .skip(skip);


     
    res.status(200).json({success:true, message:'task fetched', 'data':tasks, 'page':page, 'limit':limit})
    }
    catch(err)
    {
       res.status(400).json({success:false, message:'error getting task', error:err.message})
    }
}


 export const massUpdatetask = async(req: Request, res:Response) => {

    const {project_id, status} = req.params;

    console.log(project_id);

    try {

        const pr = await Project.findById(project_id);

        if(pr == null)
        {
            return res
            .status(400)
            .json({ message: "project not found"});
        }
    
        if(pr.owner  != req["currentUser"].id)
        {
        return res
            .status(400)
            .json({ message: "you don not have the privilege to view this task"});
        }
        

        const result = await Task.bulkWrite([
          {
            updateMany: {
              filter: { project: project_id },
              update: { $set: { status: status } }
            }
          }

          
        ]);

        return res.status(200).json({success:true, message:'tasks updated'})
        console.log(result);
      } catch (err) {
        console.log(err);
      }

 }

