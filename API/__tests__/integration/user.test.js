const factory = require('../factories');
const request = require('supertest');
const app = require('../../src/app');
const faker = require('faker');

describe('Create', () => {

    test('should receive status 201 user with success', async () => {

        const response = await request(app).post('/users').send({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: '123',
            confirmPassword: '123'
        });

        expect(response.status).toBe(201);

    });

    test('should receive status 401 with different passwords', async () => {

        const response = await request(app).post('/users').send({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: '123',
            confirmPassword: '321'
        });

        expect(response.status).toBe(401);

    });

    test('should receive status 401 with field name blank', async () => {

        const response = await request(app).post('/users').send({
            name: '',
            email: faker.internet.email(),
            password: '123',
            confirmPassword: '123'
        });

        expect(response.status).toBe(401);

    });

    test('should receive status 401 with field email blank', async () => {

        const response = await request(app).post('/users').send({
            name: faker.name.findName(),
            email: '',
            password: '123',
            confirmPassword: '123'
        });

        expect(response.status).toBe(401);

    });

    test('should receive status 401 with E-mail already registered', async () => {
        
        const user = await factory.create('User', {
            password: '123'
        });

        const response = await request(app).post('/users').send({
            name: faker.name.findName(),
            email: user.email,
            password: '321',
            confirmPassword: '321'
        });

        expect(response.status).toBe(409);

    });

});

describe('Edit', () => {

    
    
});