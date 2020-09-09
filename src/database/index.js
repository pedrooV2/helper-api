import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Entity from '../app/models/Entity';
import Avatar from '../app/models/Avatar';
import Donator from '../app/models/Donator';

// Load models in array
const models = [Entity, Avatar, Donator];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
