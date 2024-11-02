import express from "express";
import * as dotenv from "dotenv";
import { connectDB } from './config/db';
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoute";
import ProjectRoute from "./routes/ProjectRoute";
import TaskRoute from "./routes/TaskRoute";

dotenv.config();

const app = express();

app.use(express.json());




app.use('/api/user', UserRoute);
app.use('/api/project', ProjectRoute);
app.use('/api/task', TaskRoute);

process
.on('unhandledRejection', (reason, p) => {
  console.error(reason, 'Unhandled Rejection at Promise', p);
})
.on('uncaughtException', err => {
  console.error(err, 'Uncaught Exception thrown');
  process.exit(1);
});

  //connect to database
  connectDB();

  // start express server
  app.listen(3000)

  export default app;


  console.log("Express server has started ")
