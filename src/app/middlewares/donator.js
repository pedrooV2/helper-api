import Donator from '../models/Donator';

export default async (request, response, next) => {
  const { id } = request;

  const donator = await Donator.findByPk(id);

  if (!donator) {
    return response.status(403).json({ error: 'Operation not permitted' });
  }

  return next();
};
