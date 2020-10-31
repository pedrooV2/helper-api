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

  async index(request, response) {
    const { state, city, limit = 10, page = 1 } = request.query;

    const { statusCode, data } = await new EntityService().getByLocation({
      state,
      city,
      limit,
      page,
    });

    return response.status(statusCode).json({ ...data });
  }

  async show(request, response) {
    const { id } = request.params;

    const { data, statusCode } = await new EntityService().getById(id);

    return response.status(statusCode).json({ ...data });
  }
}
export default new EntityController();
