import CaseService from '../../services/Case/service';

class CaseController {
  async index(request, response) {
    const { city, state, limit = 10, page = 1 } = request.query;

    const { statusCode, data } = await new CaseService().getByLocation({
      city,
      state,
      limit,
      page,
    });

    return response.status(statusCode).json({ ...data });
  }
}

export default new CaseController();
