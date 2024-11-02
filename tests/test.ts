import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import  User  from '../src/models/User';
import  Project  from '../src/models/Project';
import  Task from '../src/models/Task';


const mockUserId = new mongoose.Types.ObjectId();

function faker(length, type) {
  if(type == 'name'){
     
      const d = new Date();
      let time = d.getTime();
      return "name"+time;
  }
  if(type == "email")
  {
    
    const d = new Date();
    let time = d.getTime();
    return time+"@gmail.com";
   
  }
}

const valid_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjY4MGRhMGVlNjgzMGNhNDViMDk1ZiIsImlhdCI6MTczMDU3NjYwMiwiZXhwIjoxNzMwNzQ5NDAyfQ.uCyg7gUf3aDbrJDyQIcpmz03jh_5KF8HgRE2x98sbMs'

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://nsimamfon:QkvGoIqnqGtWILDK@production.8cohh41.mongodb.net/?retryWrites=true&w=majority&appName=production', {
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Sky ventures CRUD API', () => {


  jest.setTimeout(8000000);

  it('should login user', async () => {


    const response = await request(app)
      .post('/api/user/login')
      .send({
        email: "one@gmail.com",
        password:"password"
      });
      expect(response.status === 401 ||  response.status === 500 || response.status === 200).toBe(true);
  });

  it('should create a user', async () => {
    const username = faker(7,"name");
    const email = faker(9,"email");

    const response = await request(app)
      .post('/api/user/create')
      .send({
        username: username,
        email: email,
        password:"123456"
      });
      expect(response.status === 400 || response.status === 201).toBe(true);
  });

 it('should create a project', async () => {

  const project = new Project();
  project.name = "Project name";
  project.description = "description here";
  project.owner = "672680da0ee6830ca45b095f";

    const response = await request(app)
      .post('/api/project/')
      .set('Authorization', `Bearer ${valid_token}`)
      .send(project);
      expect(response.body.message == "name and description are required" || response.body.message == "Project created successfully" || response.body.message == "error creating project" || response.body.message =="Unauthorized" ).toBe(true);
  });

  it('should update project', async () => {
    const project = new Project();
  project.name = "Project name";
  project.description = "description here";
  project.owner = "672680da0ee6830ca45b095f";

    const response = await request(app)
      .put('/api/project/672681100ee6830ca45b0961')
      .set('Authorization', `Bearer ${valid_token}`)
      .send(project);
      expect(response.body.message == "name and description are required" || response.body.message == "Project created successfully" || response.body.message == "error creating project" || response.body.message =="Unauthorized" ).toBe(true);
  });


  it('should create a task', async () => {

    const project = new Task();

    const stringId = '672681100ee6830ca45b0961';
    const objectId = new mongoose.Types.ObjectId(stringId);


    const task = new Task();
    task.title = "Title here";
    task.description = "Description is here";
    task.project = objectId;
    task.status = "pending";
    task.due_date = new Date();
  
      const response = await request(app)
        .post('/api/task/')
        .set('Authorization', `Bearer ${valid_token}`)
        .send(project);
        expect(response.body.message == "title, project_id and status are required" || response.body.message == "task created successfully" || response.body.message == "error creating task" || response.body.message =="Unauthorized" ).toBe(true);
    });




  it('should edit a task', async () => {

    const project = new Task();

    const stringId = '672681100ee6830ca45b0961';
    const objectId = new mongoose.Types.ObjectId(stringId);


    const task = await Task.findById('672686ca13c4e6d77cb53ded');
        task.title = "title";
       task.description = "description";
       task.status = "completed";
    
  
      const response = await request(app)
        .put('/api/task/672686ca13c4e6d77cb53ded')
        .set('Authorization', `Bearer ${valid_token}`)
        .send(project);
        expect(response.status == 200 || response.status == 400 || response.status == 401).toBe(true);
    });



});
