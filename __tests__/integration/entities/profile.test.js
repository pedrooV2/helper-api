import request from 'supertest';
import app from '../../../src/app';

import EntityFactory from '../../factories/entity';
import ProfileFactory from '../../factories/entityProfile';

import truncate from '../../util/truncate';

describe('Entity profile', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able create profile when new entity register', async () => {
    const { id } = await EntityFactory.create('Entity');
    const profile = await ProfileFactory.attrs('EntityProfile');

    profile.entity_id = id;

    const response = await request(app)
      .post('/entities/profiles')
      .send(profile);

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });
});
