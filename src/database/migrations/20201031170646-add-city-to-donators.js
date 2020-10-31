module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('donators', 'city', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('donators', 'city');
  },
};
