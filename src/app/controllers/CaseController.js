import { Op } from 'sequelize';
import Case from '../models/Case';

class CaseController {
  async store(request, response) {
    request.body.entity_id = request.id;

    const caseModel = await Case.create(request.body);

    return response.status(201).json(caseModel);
  }

  async index(request, response) {
    const { page = 1, limit = 10, title = '', opened } = request.query;
    const { id: entity_id } = request;

    const where = {
      title: {
        [Op.like]: `%${title}%`,
      },
      entity_id,
    };

    if (opened) {
      where.opened = opened;
    }

    const cases = await Case.findAll({
      where,
      order: [['created_at', 'DESC']],
      limit,
      offset: (page - 1) * limit,
    });

    const totalRecords = await Case.count({
      where,
    });
    const totalPages = Math.ceil(totalRecords / limit);

    return response.status(200).json({ cases, totalRecords, totalPages });
  }
}
export default new CaseController();
