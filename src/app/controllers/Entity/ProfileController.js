import EntityProfileService from '../../services/Entity/Profile/service';

class ProfileController {
  async store(request, response) {
    const { id: entity_id } = request;

    const { statusCode, data, error } = await new EntityProfileService().create(
      Object.assign(request.body, { entity_id })
    );

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }

  async show(request, response) {
    const { id: entity_id } = request;

    const {
      statusCode,
      data,
      error,
    } = await new EntityProfileService().getByEntityId({ entity_id });

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }

  async update(request, response) {
    const { id: entity_id } = request;

    const {
      statusCode,
      data,
      error,
    } = await new EntityProfileService().update({ entity_id, ...request.body });

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }
}

export default new ProfileController();
