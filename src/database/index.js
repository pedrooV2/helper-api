import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

// Load models in array
const models = [];

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
