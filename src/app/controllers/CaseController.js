import Case from '../models/Case';
import CaseService from '../services/Case/service';
import Cache from '../../libs/Cache';

class CaseController {
  async store(request, response) {
    request.body.entity_id = request.id;

    const caseModel = await Case.create(request.body);

    await Cache.invalidate(`entity:${request.id}:dashboard`);

    return response.status(201).json(caseModel);
  }

  async index(request, response) {
    const { page = 1, limit = 10, title = '', opened } = request.query;
    const { id: entity_id } = request;

    const { statusCode, data } = await new CaseService().getByEntityId({
      page,
      limit,
      title,
      opened,
      entity_id,
    });

    return response.status(statusCode).json({ ...data });
  }
}
export default new CaseController();
