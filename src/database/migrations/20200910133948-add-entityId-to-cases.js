module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('cases', 'entity_id', {
      type: Sequelize.INTEGER,
      references: { model: 'entities', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      defaultValue: null,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('cases', 'entity_id');
  },
};
