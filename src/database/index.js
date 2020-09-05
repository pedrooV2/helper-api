import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Entity from '../app/models/Entity';
import Avatar from '../app/models/Avatar';

// Load models in array
const models = [Entity, Avatar];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
