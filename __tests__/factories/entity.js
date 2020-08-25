import faker from 'faker';
import factory from 'factory-girl';

import Entity from '../../src/app/models/Entity';

factory.define('Entity', Entity, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export default factory;
