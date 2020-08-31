import Entity from '../../models/Entity';

class AuthController {
  async store(request, response) {
    const { email, password } = request.body;

    const entity = await Entity.findOne({ where: { email } });

    if (!entity) {
      return response.status(404).json({ error: 'Entity not found' });
    }

    if (!(await entity.checkPassword(password))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const { id } = entity;

    return response.status(201).json({
      entity: {
        id,
        email,
      },
      token: entity.generateToken(),
    });
  }
}
export default new AuthController();
