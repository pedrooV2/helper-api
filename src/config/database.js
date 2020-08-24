require('../bootstrap');

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_DIALECT } = process.env;

module.exports = {
  dialect: DB_DIALECT,
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
