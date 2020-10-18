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
}

export default new ProfileController();
