import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';

describe('Donator', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('should be able to register donators', async () => {
    const response = await request(app).post('/donators').send({
      email: 'mail@mail.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });

  it('should not be able register donator with duplicated email', async () => {
    await request(app).post('donators').send({
      email: 'mail@mail.com',
      password: '123456',
    });

    const response = await request(app).post('donators').send({
      email: 'mail@mail.com',
      password: '123456',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able register donator with password length less than six', async () => {
    const response = await request(app).post('/donators').send({
      email: 'mail@mail.com',
      password: '12345',
    });

    expect(response.status).toBe(400);
  });

  it('should not be able register donator with invalid email', async () => {
    const response = await request(app).post('/donators').send({
      email: 'mail',
      password: '123456',
    });

    expect(response.status).toBe(400);
  });
});
