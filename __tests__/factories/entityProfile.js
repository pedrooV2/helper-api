import faker from 'faker';
import factory from 'factory-girl';

import EntityProfile from '../../src/app/models/EntityProfile';

factory.define('EntityProfile', EntityProfile, {
  initials: faker.lorem.word(),
  description: faker.lorem.paragraph(2),
  whatsapp: faker.phone.phoneNumber('(##) #####-####'),
  street: faker.name.findName(),
  number: faker.random.number(),
  neighborhood: faker.name.findName(),
  city: faker.name.findName(),
  state: faker.lorem.word(),
});

export default factory;
