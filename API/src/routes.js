const routes = require('express').Router();
const { User } = require('./models');

User.create({name: 'Caio', email: 'caiotorrez@live.com', password_hash: '131232131'});

module.exports = routes;