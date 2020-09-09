module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('donators', 'avatar_id', {
      type: Sequelize.INTEGER,
      references: { model: 'avatars', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('donators', 'avatar_id');
  },
};
