import express, { Router } from 'express';
import { authentification } from "../helpers/authentication";
import { createTask, updateTask, deleteTask, viewTaskById, viewUserTasks, massUpdatetask} from '../controllers/TaskController';


const router = require("express").Router();

router.post('/', authentification, createTask);
router.put('/:id', authentification, updateTask)
router.delete('/:id', authentification, deleteTask)
router.get('/:id', authentification, viewTaskById)
router.get('/',authentification , viewUserTasks)
router.put('/mass-update/:project_id/:status', authentification, massUpdatetask)



export default router;

