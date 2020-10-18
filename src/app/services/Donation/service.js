import { Op } from 'sequelize';
import DonationFactory from '../../factories/Donation/factory';
import DonationMailJob from '../../jobs/DonationMail';

class DonationService {
  constructor() {
    const {
      CaseModel,
      DonationModel,
      queue,
      EntityModel,
      DonatorModel,
    } = DonationFactory();

    this.caseModel = CaseModel;
    this.donationModel = DonationModel;
    this.queue = queue;
    this.entityModel = EntityModel;
    this.donatorModel = DonatorModel;
  }

  async create(payload) {
    const { caseId, value, donatorId, isAnonymous } = payload;

    const caseModel = await this.caseModel.findByPk(caseId, {
      include: [{ model: this.entityModel, as: 'owner' }],
    });

    if (!caseModel) {
      return {
        statusCode: 404,
        error: 'Case not found',
      };
    }

    if (!caseModel.opened) {
      return {
        statusCode: 400,
        error: 'Donation fails, this case does not accept more donations',
      };
    }

    const valueDiff = caseModel.value - caseModel.value_collected;

    if (valueDiff < value) {
      return {
        statusCode: 400,
        error: 'Donation amount exceeds the case limit',
      };
    }

    const donation = await this.donationModel.create({
      value,
      case_id: caseId,
      donator_id: donatorId,
      is_anonymous: isAnonymous,
    });

    caseModel.value_collected += value;
    if (caseModel.value_collected === caseModel.value) {
      caseModel.opened = false;
    }
    caseModel.save();

    this.queue.add(DonationMailJob.key, {
      entityName: caseModel.owner.name,
      entityMail: caseModel.owner.email,
      valueDonated: value,
      caseTitle: caseModel.title,
      caseId: caseModel.id,
    });

    return {
      statusCode: 201,
      data: {
        id: donation.id,
        value: donation.value,
        case_id: caseId,
        donator_id: donatorId,
      },
      entity_id: caseModel.entity_id,
    };
  }

  async find(payload) {
    const { entity_id, title } = payload;

    const cases = await this.caseModel.findAll({
      where: { entity_id },
      attributes: ['id'],
    });

    const caseIds = cases.map(({ id }) => id);

    const donations = await this.donationModel.findAll({
      where: {
        case_id: caseIds,
      },
      order: [['created_at', 'DESC']],
      attributes: ['id', 'created_at', 'value', 'is_anonymous'],
      include: [
        {
          model: this.donatorModel,
          as: 'donator',
          attributes: ['id', 'full_name'],
        },
        {
          model: this.caseModel,
          as: 'case',
          attributes: ['id', 'title'],
          where: { title: { [Op.like]: `%${title}%` } },
        },
      ],
    });

    const serializedDonations = donations.map((donation) => {
      const { is_anonymous, donator, ...rest } = donation.get();

      if (is_anonymous) {
        return {
          ...rest,
          donator: null,
        };
      }

      return { ...rest, donator };
    });

    const totalDonated = await this.donationModel.sum('value', {
      where: {
        case_id: caseIds,
      },
    });

    return {
      statusCode: 200,
      data: {
        totalDonated: totalDonated / 100,
        donations: serializedDonations,
      },
    };
  }
}

export default DonationService;
