import Case from '../../models/Case';
import Donation from '../../models/Donation';

class DashboardController {
  async index(request, response) {
    const { id: entity_id } = request;

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

    return response.json({
      activeCases: activeCasesCount,
      donationsCount,
      totalAmount: totalAmount / 100,
    });
  }
}

export default new DashboardController();
