import express, { Router } from 'express';
import { authentification } from "../helpers/authentication";
import { createTask} from '../controllers/TaskController';
//import { createTask, updateTask, deleteTask, viewTaskById, viewUserTasks} from '../controllers/TaskController';


const router = require("express").Router();

router.post('/', authentification, createTask);
/*router.put('/:id', authentification, updateTask)
router.delete('/:id', authentification, deleteTask)
router.get('/:id', authentification, viewTaskById)
router.get('/:id/all',authentification , viewUserTasks)*/




export default router;

