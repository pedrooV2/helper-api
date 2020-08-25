import request from 'supertest';
import app from '../../../src/app';

describe('Entity', () => {
  it('should be able register entities', async () => {
    const response = request(app).post('/entities').send({
      name: 'entity name',
      email: 'mail@entity.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });
});
