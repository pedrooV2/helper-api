import Case from '../models/Case';
import Donation from '../models/Donation';

class DonationController {
  async store(request, response) {
    const { id: caseId } = request.params;
    const { id: donatorId } = request.id;
    const { value } = request.body;

    const caseModel = await Case.findByPk(caseId);

    if (!caseModel) {
      return response.status(404).json({ error: 'Case not found' });
    }

    const donation = await Donation.create({
      value,
      case_id: caseId,
      donator_id: donatorId,
    });

    caseModel.value_collected = value;
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
