import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';

import DonatorFactory from '../../factories/donator';
import truncate from '../../util/truncate';

describe('Donator', () => {
  beforeAll(async () => {
    await truncate();
  });

  it('should be able to register donators', async () => {
    const donator = await DonatorFactory.attrs('Donator');

    const response = await request(app).post('/donators').send(donator);

    expect(response.body).toHaveProperty('id');
    expect(response.status).toBe(201);
  });

  it('should not be able register donator with duplicated email', async () => {
    const donator = await DonatorFactory.attrs('Donator');

    await request(app).post('donators').send(donator);

    const response = await request(app).post('donators').send(donator);

    expect(response.status).toBe(400);
  });

  it('should not be able register donator with password length less than six', async () => {
    const donator = await DonatorFactory.attrs('Donator', {
      password: '12345',
    });

    const response = await request(app).post('/donators').send(donator);

    expect(response.status).toBe(400);
  });

  it('should not be able register donator with invalid email', async () => {
    const donator = await DonatorFactory.attrs('Donator', {
      email: 'mail',
    });

    const response = await request(app).post('/donators').send(donator);

    expect(response.status).toBe(400);
  });

  it('should encrypt donator password when new donator created', async () => {
    const donator = await DonatorFactory.create('Donator', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', donator.password_hash);

    expect(compareHash).toBe(true);
  });
});
