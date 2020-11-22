import { Op } from 'sequelize';
import CaseFactory from '../../factories/Case/factory';

class CaseService {
  constructor() {
    const {
      caseModel,
      fileModel,
      donationModel,
      donatorModel,
      entityModel,
      entityProfileModel,
    } = CaseFactory();

    this.caseModel = caseModel;
    this.fileModel = fileModel;
    this.donationModel = donationModel;
    this.donatorModel = donatorModel;
    this.entityModel = entityModel;
    this.entityProfileModel = entityProfileModel;
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

  async getByLocation(payload) {
    const { city, state, limit, page } = payload;

    const profiles = await this.entityProfileModel.findAll({
      where: {
        city: {
          [Op.like]: `%${city}%`,
        },
        state: {
          [Op.like]: `%${state}%`,
        },
      },
    });

    if (!profiles.length === 0) {
      return {
        statusCode: 200,
        data: [],
      };
    }

    const ids = profiles.map(({ entity_id }) => entity_id);

    const cases = await this.caseModel.findAll({
      where: { entity_id: ids, opened: true },
      order: [['created_at', 'DESC']],
      limit,
      offset: (page - 1) * limit,
      include: [
        { model: this.entityModel, as: 'owner', attributes: ['id', 'name'] },
        {
          model: this.fileModel,
          as: 'files',
          limit: 1,
          attributes: ['id', 'filepath', 'url'],
        },
      ],
    });

    const totalRecords = await this.caseModel.count({
      where: { entity_id: ids },
    });
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      statusCode: 200,
      data: { cases, totalPages, totalRecords },
    };
  }

  async getCaseById(payload) {
    const { id, entity_id } = payload;

    const caseModel = await this.caseModel.findByPk(id, {
      include: [
        {
          model: this.fileModel,
          as: 'files',
          attributes: ['id', 'filepath', 'url'],
        },
        {
          model: this.donationModel,
          as: 'donations',
          attributes: ['id', 'value', 'createdAt', 'is_anonymous'],
          include: [
            {
              model: this.donatorModel,
              as: 'donator',
              attributes: ['id', 'full_name'],
            },
          ],
        },
      ],
    });

    if (!caseModel) {
      return {
        statusCode: 404,
        error: 'Case not found',
      };
    }

    if (caseModel.entity_id !== entity_id) {
      return {
        statusCode: 403,
        error: 'Operation not permitted',
      };
    }

    const caseData = caseModel.get();

    const donations = caseData.donations.map((donation) => {
      const {
        is_anonymous,
        value,
        id: donation_id,
        createdAt,
      } = donation.get();

      if (is_anonymous) {
        return {
          value,
          id: donation_id,
          createdAt,
          donator: null,
        };
      }

      return donation.get();
    });

    caseData.donations = donations;

    return {
      statusCode: 200,
      data: caseData,
    };
  }

  async update(payload) {
    const { entity_id, case_id, title, description } = payload;

    const caseModel = await this.caseModel.findByPk(case_id);

    if (!caseModel) {
      return {
        statusCode: 404,
        error: 'Case not found',
      };
    }

    if (caseModel.entity_id !== entity_id) {
      return {
        statusCode: 403,
        error: 'Operation not permitted',
      };
    }

    caseModel.title = title;
    caseModel.description = description;
    caseModel.save();

    return {
      statusCode: 200,
      data: caseModel.get(),
    };
  }
}

export default CaseService;
