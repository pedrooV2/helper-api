export default async (request, response, next) => {
  try {
    if (!request.file) throw new Error('avatar is a required field');

    return next();
  } catch (error) {
    return response.status(400).json({
      error: 'Validation fails',
      messages: error.message,
    });
  }
};
