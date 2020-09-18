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

    this.addHook('beforeSave', async (caseModel) => {
      if (caseModel.value) caseModel.value *= 100;
      if (caseModel.value_collected) caseModel.value_collected *= 100;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Entity, { foreignKey: 'entity_id', as: 'owner' });
  }
}

export default Case;
