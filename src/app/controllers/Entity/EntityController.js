import Entity from '../../models/Entity';

class EntityController {
  async store(request, response) {
    const { email } = request.body;

    const entityExists = await Entity.findOne({
      where: { email },
    });

    if (entityExists) {
      return response
        .status(400)
        .json({ error: 'Entity email already exists' });
    }

    const { id, name } = await Entity.create(request.body);

    return response.status(201).json({
      id,
      name,
      email,
    });
  }
}
export default new EntityController();
