import request from 'supertest';
import { app } from '../../app';

describe('Testing api/users/currentuser', () => {

    test('Respond with details about current User', async () => {

        const cookies =  await global.singin();

        const response = await request(app)
            .get('/api/users/currentuser')
            .set('Cookie', cookies)
            .send()
            .expect(200);

        expect(response.body.currentUser.email).toEqual('test@test.com');
    });



})