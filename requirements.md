# Book Manager App

Create a book manager app which stores Books and Users data in the DB and create apis to perform crud operation on both of them.

Later add authentication and authorisation based on JWT tokens on certain actions perfomed on the books by distingusing the role of the user {admin, author, user} and restrict certain apis to user, author and admin respectively.

After that add apis for forgot and reset password.

## User model

- name
- age
- email
- password

## Book model

- book name
- no of pages
- price
- author id: **_To be used later_** 

## APIS

### User

- register
- login
- get profile
- delete single user---admin user 
- delete all users  -- admin
- forgot password --
- reset password  --

### Book

- create
- update  -- author
- get single
- get all
- delete single -- admin --author
- delete all -- admin

## Directory Structure

_server.js [FILE]_ - Main server file should be in root directory of project

_routes [FOLDER]_ - Should contain all api routes files

_controllers [FOLDER]_ - Should contain all controller files

_models [FOLDER]_ - Should contain all model files

_middlewares [FOLDER]_ - Should contain all middlewares files _**To be used later**_

## Requirements

- use `async` rather than `then` and `catch`
- use ES6+ coding style and structure
- manage project using git and github
