const request = require('supertest');
const app = require('../../src/app');
const factory = require('../factories');

describe('Authentication', () => {

    test('should receive status 200 and JWT token when authenticated with valid credentials', async () => {
        const user = await factory.create('User', {
            password: '123'
        });

        const response = await request(app).post('/session').send({
            email: user.email,
            password: user.password
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');

    });

    test('should receive status 401 and when authenticated with invalid credentials (wrong password)', async () => {
        const user = await factory.create('User', {
            password: '123'
        });

        const response = await request(app).post('/session').send({
            email: user.email,
            password: '321'
        });

        expect(response.status).toBe(401);

    });

    test('should receive status 401 and when authenticated with invalid credentials (blank fields)', async () => {
        const email = '';
        const password = '';

        const response = await request(app).post('/session').send({
            email: email,
            password: password
        });

        expect(response.status).toBe(401);

    });

});