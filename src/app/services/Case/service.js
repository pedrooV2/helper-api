import { Op } from 'sequelize';
import Case from '../../models/Case';

class CaseService {
  async getByEntityId(payload) {
    const { page, limit, title, opened, entity_id } = payload;

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

    return {
      statusCode: 200,
      data: { cases, totalRecords, totalPages },
    };
  }
}

export default CaseService;
