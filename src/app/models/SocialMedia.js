import Sequelize, { Model } from 'sequelize';

class SocialMedia extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        link: Sequelize.STRING,
      },
      { sequelize, tableName: 'social_medias' }
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

export default SocialMedia;
