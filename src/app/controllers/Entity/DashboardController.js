import Case from '../../models/Case';
import Donation from '../../models/Donation';
import Cache from '../../../libs/Cache';

class DashboardController {
  async entity(request, response) {
    const { id: entity_id } = request;

    const cached = await Cache.get(`entity:${entity_id}:dashboard`);

    if (cached) {
      return response.json(cached);
    }

    const cases = await Case.findAll({ where: { entity_id } });

    const casesId = cases.map(({ id }) => id);

    const donationsCount = await Donation.count({
      where: { case_id: casesId },
    });

    const totalAmount = await Donation.sum('value', {
      where: { case_id: casesId },
    });

    const activeCasesCount = await Case.count({
      where: { entity_id, opened: true },
    });

    Cache.set(`entity:${entity_id}:dashboard`, {
      activeCases: activeCasesCount,
      donationsCount,
      totalAmount: totalAmount / 100,
    });

    return response.json({
      activeCases: activeCasesCount,
      donationsCount,
      totalAmount: totalAmount / 100,
    });
  }

  async donator(request, response) {
    const { id: donator_id } = request;

    const cached = await Cache.get(`donator:${donator_id}:dashboard`);

    if (cached) {
      return response.json(cached);
    }

    const donationAmount =
      (await Donation.sum('value', {
        where: { donator_id },
      })) || 0;

    Cache.set(`donator:${donator_id}:dashboard`);

    return response.json({ donationAmount });
  }
}

export default new DashboardController();
