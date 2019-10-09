const routes = require('express').Router();
const SessionController = require('./controllers/session.controller');
const UserController = require('./controllers/user.controller');
const authMiddleware = require('./middleware/auth.middleware');

// public routes
routes.post('/session', SessionController.authenticate);
routes.post('/users', UserController.create);

routes.use(authMiddleware); // check authentication

// private routes 
routes.get('/users/:email', UserController.findOneByEmail);
routes.get('/users/', UserController.findAll);

module.exports = routes;