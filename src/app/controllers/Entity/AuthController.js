import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import Entity from '../../models/Entity';

import authConfig from '../../../config/auth';

class AuthController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

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
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new AuthController();
