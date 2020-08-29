const { APP_SECRET, EXPIRES } = process.env;

export default {
  secret: APP_SECRET,
  expiresIn: EXPIRES,
};
