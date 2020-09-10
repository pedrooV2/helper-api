import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';

import CaseFactory from '../factories/case';
import EntityFactory from '../factories/entity';
import FileFactory from '../factories/file';

describe('Files', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able upload files for a created case', async () => {
    const entity = await EntityFactory.create('Entity', {
      password: '123456',
    });

    const auth = await request(app).post('/entity/auth').send({
      email: entity.email,
      password: '123456',
    });

    const { token } = auth.body;

    const caseAttr = await CaseFactory.attrs('Case');

    const { body } = await request(app)
      .post('/cases')
      .send(caseAttr)
      .set('authorization', `Bearer ${token}`);

    const { id } = body;

    const { filepath } = await FileFactory.attrs('File');

    const response = await request(app)
      .post(`/cases/${id}/files`)
      .attach('file', filepath)
      .set('authorization', `Bearer ${token}`);

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });
});
