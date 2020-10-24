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

  async update(request, response) {
    const { id: entity_id } = request;

    const { statusCode, error } = await new EntityService().update({
      entity_id,
      ...request.body,
    });

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json();
  }
}
export default new EntityController();
