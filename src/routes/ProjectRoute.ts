import express, { Router } from 'express';
import { authentification } from "../helpers/authentication";
import { createProject, updateProject, deleteProject, viewProjectById, viewUserProjects} from '../controllers/ProjectController';


const router = require("express").Router();

router.post('/', authentification, createProject);
router.put('/:id', authentification, updateProject)
router.delete('/:id', authentification, deleteProject)
router.get('/:id', authentification, viewProjectById)
router.get('/:id/all',authentification , viewUserProjects)




export default router;

