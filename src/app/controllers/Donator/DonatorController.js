import DonatorService from '../../services/Donator/service';

class DonatorController {
  async store(request, response) {
    const { statusCode, error, data } = await new DonatorService().create(
      request.body
    );

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }

  async update(request, response) {
    const { id: donator_id } = request;

    const { statusCode, error, data } = await new DonatorService().update(
      Object.assign(request.body, { donator_id })
    );

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }
}

export default new DonatorController();
