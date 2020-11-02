import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Entity from '../app/models/Entity';
import Avatar from '../app/models/Avatar';
import Donator from '../app/models/Donator';
import Case from '../app/models/Case';
import File from '../app/models/File';
import EntityProfile from '../app/models/EntityProfile';
import Phone from '../app/models/Phone';
import SocialMedia from '../app/models/SocialMedia';
import Donation from '../app/models/Donation';
import Card from '../app/models/Card';

// Load models in array
const models = [
  Entity,
  Avatar,
  Donator,
  Case,
  File,
  EntityProfile,
  Phone,
  SocialMedia,
  Donation,
  Card,
];

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
