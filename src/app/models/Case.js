import Sequelize, { Model } from 'sequelize';

class Case extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        description: Sequelize.STRING,
        value: {
          type: Sequelize.NUMBER,
          get() {
            return this.getDataValue('value') / 100;
          },
          set(value) {
            this.setDataValue('value', value * 100);
          },
        },
        value_collected: {
          type: Sequelize.NUMBER,
          get() {
            return this.getDataValue('value_collected') / 100;
          },
          set(value) {
            this.setDataValue('value_collected', value * 100);
          },
        },
        opened: Sequelize.BOOLEAN,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Entity, { foreignKey: 'entity_id', as: 'owner' });
    this.hasMany(models.File, { foreignKey: 'case_id', as: 'files' });
    this.hasMany(models.Donation, { foreignKey: 'case_id', as: 'donations' });
  }
}

export default Case;
