import DonationService from '../services/Donation/service';

class DonationController {
  async store(request, response) {
    const { id: caseId } = request.params;
    const { id: donatorId } = request;
    const { value } = request.body;

    const { statusCode, data, error } = await new DonationService().create({
      caseId,
      donatorId,
      value,
    });

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }
}

export default new DonationController();
