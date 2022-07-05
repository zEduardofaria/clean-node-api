import request from 'supertest';
import app from '../config/app';

describe('SignUp routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Eduardo',
        email: 'z.eduardofaria@gmail.com',
        password: '123123',
        confirmPassword: '123123'
      })
      .expect(200);
  });
});
