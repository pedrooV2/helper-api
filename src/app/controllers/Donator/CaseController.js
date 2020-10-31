import Case from '../../models/Case';
import File from '../../models/File';
import Entity from '../../models/Entity';
import CaseService from '../../services/Case/service';

class CaseController {
  async index(request, response) {
    const { city, state, limit = 10, page = 1 } = request.query;

    const { statusCode, data } = await new CaseService().getByLocation({
      city,
      state,
      limit,
      page,
    });

    return response.status(statusCode).json({ ...data });
  }

  async show(request, response) {
    const { id } = request.params;

    const caseDetail = await Case.findByPk(id, {
      include: [
        { model: Entity, as: 'owner', attributes: ['id', 'name'] },
        { model: File, as: 'files', attributes: ['id', 'filepath', 'url'] },
      ],
    });

    return response.json(caseDetail);
  }
}

export default new CaseController();
