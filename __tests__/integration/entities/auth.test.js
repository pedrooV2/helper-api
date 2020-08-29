import request from 'supertest';
import app from '../../../src/app';

import EntityFactory from '../../factories/entity';
import truncate from '../../util/truncate';

describe('Entity auth', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able authenticate with valid credentials', async () => {
    const entity = await EntityFactory.attrs('Entity');

    await request(app).post('/entities').send(entity);

    const response = await request(app).post('/entities/auth').send({
      email: entity.email,
      password: entity.password,
    });

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(201);
  });

  it('should not be able authenticate with invalid credentials', async () => {
    const entity = await EntityFactory.attrs('Entity');

    const response = await request(app).post('/entities/auth').send({
      email: entity.email,
      password: entity.password,
    });

    expect(response.status).toBe(404);
  });
});
