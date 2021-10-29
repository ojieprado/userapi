# API Backend Node.js Diagnostic Exam 

An easy way to get started with a Express server with MySQL with Node.js.

## Features

A basic user management system API implementing authentication (login page), CRUD functions, wherein  admin can:  
- Add a new user 
- Edit a user 
- Delete a user 
- View list of all users in the system  
- Allow multiple users to be removed  
- User must have fields  

## Requirements

- [node & npm](https://nodejs.org/en/)
- [GitHub Repository](https://github.com/)
- [Mysql](https://dev.mysql.com/)

## Installation

- `git clone`[userapi]
- `cd userapi`
- `npm install`
- `[start Mysql]`
- `run query.sql on db`
- `npm start`
- optional: include _.env_ in your _.gitignore_

### User Routes

- visit http://localhost:3000
  - [POST] /user - Insert one user
  - [GET] /users - Get all user
  - [GET] /user/:id - Get User by Id
  - [PUT] /user/:id - Update one user
  - [DELETE] /user/:id - Delete one user
  - [POST] /users - Delete each user