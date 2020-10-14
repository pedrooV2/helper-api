import DonationFactory from '../../factories/Donation/factory';

class DonationService {
  constructor() {
    const { CaseModel, DonationModel } = DonationFactory();

    this.caseModel = CaseModel;
    this.donationModel = DonationModel;
  }

  async create(payload) {
    const { caseId, value, donatorId } = payload;

    const caseModel = await this.caseModel.findByPk(caseId);

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
