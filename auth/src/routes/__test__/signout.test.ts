import request from 'supertest';
import { app } from '../../app';

describe('Tetsing api/signout', () => {

    test('should clear cokkie after singin out', async () => {
        await request(app)
            .post('/api/users/signup')
            .send({
                email: 'test@test.com',
                password: 'pasword',
            }).expect(201);

        const result = await request(app)
            .post('/api/users/singout')
            .send({})
            .expect(200);

        expect(result.get('Set-Cookie')[0])
            .toEqual(
                'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
            );
    })


})
