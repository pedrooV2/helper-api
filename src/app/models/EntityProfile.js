import Sequelize, { Model } from 'sequelize';

class EntityProfile extends Model {
  static init(sequelize) {
    super.init(
      {
        cnpj: Sequelize.STRING,
        initials: Sequelize.STRING,
        description: Sequelize.STRING,
        whatsapp: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
      },
      { sequelize, tableName: 'entity_profiles' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Avatar, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Entity, { foreignKey: 'entity_id', as: 'entity' });
  }
}

export default EntityProfile;
