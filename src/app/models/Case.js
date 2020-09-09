import Sequelize, { Model } from 'sequelize';

class Case extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        value: Sequelize.NUMBER,
        value_collected: Sequelize.NUMBER,
        opened: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Entity, { foreignKey: 'entity_id', as: 'owner' });
  }
}

export default Case;
