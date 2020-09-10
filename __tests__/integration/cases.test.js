import request from 'supertest';
import app from '../../src/app';

import CaseFactory from '../factories/case';
import EntityFactory from '../factories/entity';

import truncate from '../util/truncate';

describe('Cases', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should not be able create cases without authenticate', async () => {
    const caseAttr = await CaseFactory.attrs('Case');

    const response = await request(app).post('/cases').send(caseAttr);

    expect(response.status).toBe(401);
  });

  it('should be able create cases when authenticate', async () => {
    const entity = await EntityFactory.create('Entity', {
      password: '123456',
    });

    const auth = await request(app).post('/entities/auth').send({
      email: entity.email,
      password: '123456',
    });

    const { token } = auth.body;

    const caseAttr = await CaseFactory.attrs('Case');

    const response = await request(app)
      .post('/cases')
      .send(caseAttr)
      .set('authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });
});
