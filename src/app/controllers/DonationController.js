import Case from '../models/Case';
import Donation from '../models/Donation';

class DonationController {
  async store(request, response) {
    const { id: caseId } = request.params;
    const { id: donatorId } = request;
    const { value } = request.body;

    const caseModel = await Case.findByPk(caseId);

    if (!caseModel) {
      return response.status(404).json({ error: 'Case not found' });
    }

    if (!caseModel.opened) {
      return response.status(400).json({
        error: 'Donation fails, this case does not accept more donations',
      });
    }

    const valueDiff = caseModel.value - caseModel.value_collected;

    if (valueDiff < value) {
      return response
        .status(400)
        .json({ error: 'Donation amount exceeds the case limit' });
    }

    const donation = await Donation.create({
      value,
      case_id: caseId,
      donator_id: donatorId,
    });

    caseModel.value_collected += value;
    caseModel.save();

    return response.status(201).json({
      id: donation.id,
      value: donation.value,
      case_id: caseId,
      donator_id: donatorId,
    });
  }
}

export default new DonationController();
