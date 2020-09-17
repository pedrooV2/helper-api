import Sequelize, { Model } from 'sequelize';

class Phone extends Model {
  static init(sequelize) {
    super.init(
      {
        phone: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.EntityProfile, {
      foreignKey: 'entity_profile_id',
      as: 'profile',
    });
  }
}

export default Phone;
