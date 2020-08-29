import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Entity from '../app/models/Entity';

// Load models in array
const models = [Entity];

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
