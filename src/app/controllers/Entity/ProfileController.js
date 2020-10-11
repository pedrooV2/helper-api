import EntityProfileService from '../../services/Entity/Profile/service';

class ProfileController {
  async store(request, response) {
    const { statusCode, data, error } = await new EntityProfileService().create(
      request.body
    );

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }
}

export default new ProfileController();
