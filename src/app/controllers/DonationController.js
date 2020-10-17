import DonationService from '../services/Donation/service';
import Cache from '../../libs/Cache';

class DonationController {
  async store(request, response) {
    const { id: caseId } = request.params;
    const { id: donatorId } = request;
    const { value } = request.body;

    const {
      statusCode,
      data,
      error,
      entity_id,
    } = await new DonationService().create({
      caseId,
      donatorId,
      value,
    });

    if (error) {
      return response.status(statusCode).json({ error });
    }

    await Cache.invalidate(`entity:${entity_id}:dashboard`);
    await Cache.invalidate(`entity:${entity_id}:case:${caseId}`);

    return response.status(statusCode).json({ ...data });
  }
}

export default new DonationController();
