import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        original_name: Sequelize.STRING,
        filepath: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}:${process.env.APP_PORT}/files/${this.filepath}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Case, { foreignKey: 'case_id', as: 'case' });
  }
}

export default File;
