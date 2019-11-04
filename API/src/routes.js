const routes = require('express').Router();
const SessionController = require('./controllers/session.controller');
const UserController = require('./controllers/user.controller');
const TaskController = require('./controllers/task.controller');
const authMiddleware = require('./middleware/auth.middleware');

// public routes
routes.post('/session', SessionController.authenticate);
routes.post('/users', UserController.create);

routes.use(authMiddleware); // check authentication

// private routes - Users
routes.get('/users/:email', UserController.findOneByEmail);
routes.get('/users/', UserController.findAll);
// Tasks
routes.get('/task/:id', TaskController.findOne);
routes.get('/task/', TaskController.findAll);
routes.post('/task/', TaskController.create);

module.exports = routes;