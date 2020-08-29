import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

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
}

export default Entity;
