import Sequelize, { Model } from 'sequelize';

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

    return this;
  }
}

export default Donator;
