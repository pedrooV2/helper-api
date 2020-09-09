import request from 'supertest';
import app from '../../src/app';

import CaseFactory from '../factories/case';

import truncate from '../util/truncate';

describe('Cases', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should not be able create cases without authenticate', async () => {});
});
