import request from 'supertest';
import { app, server } from '../server'; // Assuming your server.js file is in the same directory

describe('POST /user/reg', () => {
  afterAll(() => {
    server.close();
  });

  test('It should register a new user', async () => {
    const newUser = {
      email: 'test@domain.com',
      password: 'test1234',
    };

    const response = await request(app).post('/user/reg').send(newUser);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User registered successfully');
  });

  test('It should not register a user with an existing email', async () => {
    const existingUser = {
      email: 'test@domain.com',
      password: 'test1234',
    };

    const response = await request(app).post('/user/reg').send(existingUser);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Email already exists');
  });
});
