import SocialMediaService from '../services/Entity/SocialMedia/service';

class SocialMediaController {
  async index(request, response) {
    const { id: entityId } = request;

    const { statusCode, data, error } = await new SocialMediaService().findAll({
      entityId,
    });

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json([...data]);
  }

  async store(request, response) {
    const { name, link } = request.body;
    const { id: entityId } = request;

    const { statusCode, data, error } = await new SocialMediaService().create({
      entityId,
      name,
      link,
    });

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }
}

export default new SocialMediaController();
