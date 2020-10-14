import Case from '../../models/Case';

class DashboardController {
  async index(request, response) {
    const { id: entity_id } = request;

    const activeCasesCount = await Case.count({
      where: { entity_id, opened: true },
    });

    return response.json({ activeCases: activeCasesCount });
  }
}

export default new DashboardController();
