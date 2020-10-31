module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('donators', 'state', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('donators', 'state');
  },
};
