import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';

describe('Entity', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register entities', async () => {
    const response = await request(app).post('/entities').send({
      name: 'entity name',
      email: 'mail@entity.com',
      password: '123456',
    });

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app).post('/entities').send({
      name: 'entity name',
      email: 'mail@entity.com',
      password: '123456',
    });

    const response = await request(app).post('/entities').send({
      name: 'entity name',
      email: 'mail@entity.com',
      password: '123456',
    });

    expect(response.status).toBe(400);
  });
});
