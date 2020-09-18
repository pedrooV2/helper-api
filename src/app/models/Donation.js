import Sequelize, { Model } from 'sequelize';

class Donation extends Model {
  static init(sequelize) {
    super.init(
      {
        value: {
          type: Sequelize.INTEGER,
          get() {
            return this.value * 100;
          },
        },
      },
      { sequelize }
    );

    this.addHook('beforeSave', async (donation) => {
      if (donation.value) donation.value *= 100;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Donator, { foreignKey: 'donator_id', as: 'donator' });
    this.belongsTo(models.Case, { foreignKey: 'case_id', as: 'case' });
  }
}

export default Donation;
