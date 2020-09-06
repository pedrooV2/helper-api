import faker from 'faker';
import factory from 'factory-girl';

import Donator from '../../src/app/models/Donator';

factory.define('Donator', Donator, {
  full_name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber('(##) #####-####'),
  password: faker.internet.password(),
});

export default factory;
