import Sequelize, { Model } from 'sequelize';

class Donation extends Model {
  static init(sequelize) {
    super.init(
      {
        value: {
          type: Sequelize.INTEGER,
          get() {
            return this.getDataValue('value') / 100;
          },
          set(value) {
            this.setDataValue('value', value * 100);
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Donator, { foreignKey: 'donator_id', as: 'donator' });
    this.belongsTo(models.Case, { foreignKey: 'case_id', as: 'case' });
  }
}

export default Donation;
