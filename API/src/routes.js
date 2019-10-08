const routes = require('express').Router();
const SessionController = require('./controllers/session.controller');
const UserController = require('./controllers/user.controller');

routes.post('/session', SessionController.authenticate);
routes.post('/users', UserController.create);



module.exports = routes;