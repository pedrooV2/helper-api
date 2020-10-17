import { Op } from 'sequelize';
import CaseFactory from '../../factories/Case/factory';

class CaseService {
  constructor() {
    const { caseModel, fileModel } = CaseFactory();

    this.caseModel = caseModel;
    this.fileModel = fileModel;
  }

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

    const cases = await this.caseModel.findAll({
      where,
      order: [['created_at', 'DESC']],
      limit,
      offset: (page - 1) * limit,
    });

    const totalRecords = await this.caseModel.count({
      where,
    });
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      statusCode: 200,
      data: { cases, totalRecords, totalPages },
    };
  }

  async getCaseById(payload) {
    const { id, entity_id } = payload;

    const caseModel = await this.caseModel.findByPk(id, {
      include: [{ model: this.fileModel, as: 'files' }],
    });

    if (!caseModel) {
      return {
        statusCode: 404,
        error: 'Case not found',
      };
    }

    if (!caseModel.entity_id !== entity_id) {
      return {
        statusCode: 403,
        error: 'Operation not permitted',
      };
    }

    return {
      statusCode: 200,
      data: caseModel,
    };
  }
}

export default CaseService;
