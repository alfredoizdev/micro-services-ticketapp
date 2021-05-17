import request from 'supertest';
import { app } from '../../app';

describe('Testing api/singup', () => {

    it('return  201 on successful singup', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            }).expect(201);
    });
    it('return  400 with an invalid email', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({
                email: 'testest.com',
                password: 'password',
            }).expect(400);
    });
    it('return  400 with an invalid password', async () => {
        return request(app)
            .post('/api/users/signup')
            .send({
                email: 'testest.com',
                password: 'p',
            }).expect(400);
    });
    it('return  400 with an missing email and password', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: '',
            }).expect(400);

        await request(app)
            .post('/api/users/signup')
            .send({
                email: '',
                password: 'password',
            }).expect(400);
    });

    it('disallows duplicate emails', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'tes@test.com',
                password: 'password',
            }).expect(201);

        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'tes@test.com',
                password: 'password',
            }).expect(400);
    });

    it('set cookies after successfull singup', async () => {

        const results = await request(app)
            .post('/api/users/signup')
            .send({
                email: 'tes@test.com',
                password: 'password',
            }).expect(201);

        expect(results.get('Set-Cookie')).toBeDefined();

    })
});