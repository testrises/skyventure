import mongoose, { isValidObjectId } from "mongoose";
import Project from "../models/Project";
import {NextFunction , Request, Response } from "express"
import { authentification } from "../helpers/authentication";



export const createProject = async (req :Request, res : Response) =>
{

    try {
        let { description, name } = req.body;
        if (!description || !name) {
          return res
            .status(400)
            .json({ message: "name and description are required" });
        }
  
       const project = new Project();
       project.name = name;
       project.description = description;
       project.owner = req["currentUser"].id;

       console.log(req["currentUser"]);

       const created_project = await project.save();

   
        return res.status(200).json({ message: "Project created successfully", data :created_project});
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "error creating project" });
      }
   
}

export const updateProject = async (req :Request, res : Response) =>{


    try {
        let { description, name} = req.body;
        if (!description || !name) {
          return res
            .status(400)
            .json({ message: "name and description are required" });
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
            .json({ message: "invalid project id" });
        }
      

       const project = await Project.findById(id);
       console.log(project);

       if(project == null)
       {
        return res
            .status(400)
            .json({ message: "project not found" });
       }

       if(project.owner != req["currentUser"].id)
       {
        return res
            .status(400)
            .json({ message: "you don not have the privilege to edit this post" });
       }
       project.name = name;
       project.description = description;


       console.log(req["currentUser"]);

       const updated_project = await project.save();

   
        return res.status(200).json({ message: "Project updated successfully", data :updated_project});
      } catch (error) {
        console.error(error);
        return res.status(400).json({ message: "error editing project", 'err':error });
      }
   
}

export const deleteProject = async (req :Request, res : Response) =>{

    const {id} = req.params;
    console.log(id);
    try{
     const pr = await Project.findById(id);
  
     if(pr == null){ 
       return res.status(400).json({success:false, message:'product not found'})
     } 
     
     if(pr.owner != req["currentUser"].id)
        {
         return res
             .status(400)
             .json({ message: "you don not have the privilege to delete this project" });
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

export const viewProjectById = async (req :Request, res : Response) =>{
    const {id} = req.params;
    try{
        
     const pr = await Project.findById(id);
     if(!pr){ 
        res.status(400).json({success:false, message:'product not found'})
     }  
     
     if(pr.owner != req["currentUser"].id)
        {
         return res
             .status(400)
             .json({ message: "you don not have the privilege to view this Project" });
        }
     
    res.status(200).json({success:true, message:'project fetched', 'data':pr})
    }
    catch(err)
    {
       res.status(400).json({success:false, message:'error getting project', error:err.message})
    }
}

export const viewUserProjects = async (req :Request, res : Response) =>{
   
    const {id} = req.params;
    try{
        
     const pr = await Project.find({owner:id, deleted_at:null});
     if(!pr){ 
        res.status(400).json({success:false, message:'projects not found'})
     }  
     
     
     
    res.status(200).json({success:true, message:'project fetched', 'data':pr})
    }
    catch(err)
    {
       res.status(400).json({success:false, message:'error getting project', error:err.message})
    }
}


