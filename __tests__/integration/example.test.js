import request from 'supertest';
import app from '../../src/app';

describe('Example', () => {
  it('simple request test', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });
});
