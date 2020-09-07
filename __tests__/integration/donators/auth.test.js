import request from 'supertest';
import app from '../../../src/app';

import DonatorFactory from '../../factories/donator';
import truncate from '../../util/truncate';

describe('Donator auth', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able authenticate with valid credentials', async () => {
    const donator = await DonatorFactory.attrs('Donator');

    await request(app).post('/donators').send(donator);

    const response = await request(app).post('/donators/auth').send({
      email: donator.email,
      password: donator.password,
    });

    expect(response.body).toHaveProperty('token');
    expect(response.status).toBe(201);
  });

  it('should not be able authenticate with invalid email', async () => {
    const donator = await DonatorFactory.attrs('Donator');

    const response = await request(app).post('/donators/auth').send({
      email: donator.email,
      password: donator.password,
    });

    expect(response.status).toBe(404);
  });

  it('should not be able authenticate with invalid password', async () => {
    const donator = await DonatorFactory.attrs('Donator', {
      password: '123456',
    });

    await request(app).post('/donators').send(donator);

    const response = await request(app).post('/donators/auth').send({
      email: donator.email,
      password: '123456789',
    });

    expect(response.status).toBe(401);
  });
});
