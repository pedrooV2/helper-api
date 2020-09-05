/* eslint-disable no-console */
import faker from 'faker';
import factory from 'factory-girl';

import download from '../util/download';

import Avatar from '../../src/app/models/Avatar';

factory.define('Avatar', Avatar, {
  original_name: faker.name.firstName(),
  filepath: download(faker.image.avatar(), () => console.log('Done!')),
});

export default factory;
