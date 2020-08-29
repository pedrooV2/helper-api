import * as Yup from 'yup';
import Entity from '../../models/Entity';

class EntityController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email } = request.body;

    const entityExists = await Entity.findOne({
      where: { email },
    });

    if (entityExists) {
      return response
        .status(400)
        .json({ error: 'Entity email already exists' });
    }

    const entity = await Entity.create(request.body);

    return response.status(201).json(entity);
  }
}
export default new EntityController();
