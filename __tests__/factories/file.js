/* eslint-disable no-console */
import faker from 'faker';
import factory from 'factory-girl';

import download from '../util/download';

import File from '../../src/app/models/File';

factory.define('File', File, {
  case_id: factory.assoc('Case', 'id'),
  original_name: faker.name.firstName(),
  filepath: download(faker.image.avatar(), () => console.log('Done!')).then(
    (response) => response
  ),
});

export default factory;
