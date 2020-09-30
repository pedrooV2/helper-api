import Sequelize, { Model } from 'sequelize';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authConfig from '../../config/auth';

class Entity extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (entity) => {
      if (entity.password) {
        entity.password_hash = await bcrypt.hash(entity.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }

  generateToken() {
    const { id } = this;
    return jwt.sign(
      {
        id,
        accessIdentifier: { isEntity: true },
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );
  }
}

export default Entity;
