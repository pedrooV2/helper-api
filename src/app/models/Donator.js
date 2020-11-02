import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

class Donator extends Model {
  static init(sequelize) {
    super.init(
      {
        full_name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
      },
      { sequelize }
    );

    this.addHook('beforeSave', async (donator) => {
      if (donator.password) {
        donator.password_hash = await bcrypt.hash(donator.password, 8);
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
        accessIdentifier: { isDonator: true },
      },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Avatar, { foreignKey: 'avatar_id', as: 'avatar' });
    this.hasMany(models.Card, { foreignKey: 'donator_id', as: 'cards' });
  }
}

export default Donator;
