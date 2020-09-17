import Entity from '../models/Entity';

export default async (request, response, next) => {
  const { id } = request;

  const entity = await Entity.findByPk(id);

  if (!entity) {
    return response.status(403).json({ error: 'Operation not permitted' });
  }

  return next();
};
