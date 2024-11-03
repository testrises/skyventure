# skyventure
Assessment Exercise for Sky Venture



To run the app, run the following in your terminal

npm run dev

it runs in port 3000

#Requirements

Node 20
NPM
mongoose

# Steps

cd into whatever directory you want work from.
Run git clone https://github.com/testrises/skyventure.git then cd into the repo.
After cloning the project, run cp .env .env.example on your terminal to create a new .env file from the .env.example
Run npm install to install all the dependencies.

Run npm run dev the project in development mode.

# Test URL

The app is deployed in a remote test server with BASE URL  https://mocknew.onrender.com/

# Postnam documentation

The postman documentation can be found here https://documenter.getpostman.com/view/12000186/2sAY4vi3YK

#Github URL

https://github.com/testrises/skyventure

#Running with docker

The app is dockerized , to run with docker, RUN  docker docker-compose up --build


#Integration test

To run test, RUN  npm run test

#Technical Requirements in the testrises

It was requested that  pagination and sorting be applied in the task list. This is implemented in the API below

https://mocknew.onrender.com/api/task?project_id=6726fd2216c014ca5853dd41&status=completed&due_date=2024-11-03&limit=4&page=2 (IN postman the API name is task/list)

Soft delete is also applied in projects and tasks
