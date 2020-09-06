import Sequelize, { Model } from 'sequelize';

class Avatar extends Model {
  static init(sequelize) {
    super.init(
      {
        original_name: Sequelize.STRING,
        filepath: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}:${process.env.APP_PORT}/avatar/${this.filepath}`;
          },
        },
      },
      { sequelize }
    );

    return this;
  }
}

export default Avatar;
