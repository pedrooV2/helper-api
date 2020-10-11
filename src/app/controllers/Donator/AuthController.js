import DonatorService from '../../services/Donator/service';

class DonatorController {
  async store(request, response) {
    const { statusCode, data, error } = await new DonatorService().auth(
      request.body
    );

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }
}

export default new DonatorController();
