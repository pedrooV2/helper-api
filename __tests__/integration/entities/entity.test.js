import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';

import EntityFactory from '../../factories/entity';
import truncate from '../../util/truncate';

describe('Entity', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register entities', async () => {
    const entity = await EntityFactory.attrs('Entity');

    const response = await request(app).post('/entities').send(entity);

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });

  it('should not be able to register with duplicated email', async () => {
    const entity = await EntityFactory.attrs('Entity');

    await request(app).post('/entities').send(entity);

    const response = await request(app).post('/entities').send(entity);

    expect(response.status).toBe(400);
  });

  it('should encrypt entity password when new entity created', async () => {
    const entity = await EntityFactory.create('Entity', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', entity.password_hash);

    expect(compareHash).toBe(true);
  });

  it('should not be able register with passwords length less than six', async () => {
    const entity = await EntityFactory.attrs('Entity', {
      password: '12345',
    });

    const response = await request(app).post('/entities').send(entity);

    expect(response.status).toBe(400);
  });
});
