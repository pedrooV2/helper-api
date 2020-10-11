import EntityService from '../../services/Entity/service';

class EntityController {
  async store(request, response) {
    const { statusCode, data, error } = await new EntityService().create(
      request.body
    );

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }
}
export default new EntityController();
