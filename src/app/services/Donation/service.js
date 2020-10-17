import DonationFactory from '../../factories/Donation/factory';
import DonationMailJob from '../../jobs/DonationMail';

class DonationService {
  constructor() {
    const { CaseModel, DonationModel, queue, EntityModel } = DonationFactory();

    this.caseModel = CaseModel;
    this.donationModel = DonationModel;
    this.queue = queue;
    this.entityModel = EntityModel;
  }

  async create(payload) {
    const { caseId, value, donatorId } = payload;

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
    });

    caseModel.value_collected += value;
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
}

export default DonationService;
