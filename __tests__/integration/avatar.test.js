import rimraf from 'rimraf';
import { resolve } from 'path';
import request from 'supertest';
import app from '../../src/app';

import AvatarFactory from '../factories/avatar';
import EntityFactory from '../factories/entity';
import truncate from '../util/truncate';

describe('Avatar', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterAll(() => {
    rimraf.sync(resolve(__dirname, '..', 'tmp'));
  });

  it('should be able to upload avatar', async () => {
    const entity = await EntityFactory.create('Entity', {
      password: '123456',
    });

    const { filepath } = await AvatarFactory.attrs('Avatar');

    const auth = await request(app).post('/entities/auth').send({
      email: entity.email,
      password: '123456',
    });

    const { token } = auth.body;

    const response = await request(app)
      .post('/avatar')
      .attach('avatar', filepath)
      .set('authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
