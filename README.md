# fleek-mock

## Goals of Project
 - Dynamic scaffolded API based off of Swagger Documentation and Models
 - Ability for application developers whom need an API for testing and rapid prototyping

## How To
- Create Models
  - These models are a 1:1 relationship with primary route tags
  - The models are mongoose models
  - A models.json or models.js must exist with all the models
- Create Swagger Documentation
  - Swagger Documentation must follow the Fleek Specifications
  - Primary Tags of the routes are treated as controllers
  - Naming of primary definitions are as such [tag].[method]
  - Naming of definitions are as such [tag].[method].[type]

## Prerequisites
  - MongoDB
  - Node.js < (4.x.x)

## Run
  ```js
  npm install
  MONGO_URI=mongodb://127.0.0.1/fleek npm start
  ```

## Swagger
  http://[path_of_application]/swagger

### Todo
 - Build out as library whereby only swagger.json and a model.json/model.js file is required
 - Injectable Middleware rather than forking the present project and adding to the middleware directory

#### Notes
 - Basic version created on 04/14/2016

#### Authors
- [Peter A. Tariche](http://github.com/ptariche)
