import Sequelize, { Model } from 'sequelize';

class Card extends Model {
  static init(sequelize) {
    super.init(
      {
        nickname: Sequelize.STRING,
        number: Sequelize.STRING,
        cvv: Sequelize.STRING,
        expiration_date: Sequelize.STRING,
        cpf: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Donator, { foreignKey: 'donator_id', as: 'owner' });
  }
}

export default Card;
