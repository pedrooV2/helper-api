module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('donations', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      case_id: {
        type: Sequelize.INTEGER,
        references: { model: 'cases', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      donator_id: {
        type: Sequelize.INTEGER,
        references: { model: 'donators', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('donations');
  },
};
