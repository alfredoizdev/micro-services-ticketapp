import request from 'supertest';
import { app } from '../../app';

describe('Testing api/singin', () => {

    it('fails when a email that does not exist is supplied', async () => {
        await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test13@email.com',
                password: 'password',
            }).expect(400)
    });

    it('fails when a incorrect password was supplied', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            }).expect(201);

        await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test@test.com',
                password: '123456',
            }).expect(400)
    });

    it('Responds with a cookie when give valid credentials', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'password',
            }).expect(201);

        const result = await request(app)
            .post('/api/users/signin')
            .send({
                email: 'test@test.com',
                password: 'password',
            }).expect(200);

        expect(result.get('Set-Cookie')).toBeDefined();
    });

})