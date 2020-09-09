import faker from 'faker';
import factory from 'factory-girl';

import Case from '../../src/app/models/Case';

factory.define('Case', Case, {
  title: faker.name.title(),
  description: faker.lorem.paragraph(2),
  value: faker.commerce.price(),
});

export default factory;
