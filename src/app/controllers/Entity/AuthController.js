import EntityService from '../../services/Entity/service';

class AuthController {
  async store(request, response) {
    const { statusCode, data, error } = await new EntityService().auth(
      request.body
    );

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }
}
export default new AuthController();
