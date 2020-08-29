import jwt from 'jsonwebtoken';

import Entity from '../../models/Entity';

import authConfig from '../../../config/auth';

class AuthController {
  async store(request, response) {
    const { email, password } = request.body;

    const entity = await Entity.findOne({ where: { email } });

    if (!entity) {
      return response.status(404).json({ error: 'Entity not found' });
    }

    const { id } = entity;

    return response.status(201).json({
      entity: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new AuthController();
