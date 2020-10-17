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

  async show(request, response) {
    const { id } = request.params;
    const { id: entity_id } = request;

    const cached = await Cache.get(`entity:${entity_id}:case:${id}`);

    if (cached) {
      return response.status(200).json(cached);
    }

    const { error, data, statusCode } = await new CaseService().getCaseById({
      id,
      entity_id,
    });

    if (error) {
      return response.status(statusCode).json({ error });
    }

    await Cache.set(`entity:${entity_id}:case:${id}`, { ...data });

    return response.status(statusCode).json({ ...data });
  }
}
export default new CaseController();
