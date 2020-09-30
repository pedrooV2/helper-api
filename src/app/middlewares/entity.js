export default async (request, response, next) => {
  const { accessIdentifier } = request;

  if (!accessIdentifier.isEntity) {
    return response.status(403).json({ error: 'Operation not permitted' });
  }

  return next();
};
