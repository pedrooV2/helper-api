module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('donations', 'is_anonymous', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('donations', 'is_anonymous');
  },
};
