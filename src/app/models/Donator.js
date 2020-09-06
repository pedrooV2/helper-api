import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Donator extends Model {
  static init(sequelize) {
    super.init(
      {
        full_name: Sequelize.STRING,
        email: Sequelize.STRING,
        phone: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
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
}

export default Donator;
