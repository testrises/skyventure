import express, { Router } from 'express';
import { createUser, login} from '../controllers/UserController';

const router = require("express").Router();



router.post('/create', createUser);
router.post('/login', login)


export default router;

