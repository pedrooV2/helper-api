import SocialMediaService from '../services/Entity/SocialMedia/service';

class SocialMediaController {
  async index(request, response) {
    const { id: entityId } = request;

    const profile = await EntityProfile.findOne({
      where: { entity_id: entityId },
    });

    if (!profile) {
      return response.status(404).json({ error: 'Profile not found' });
    }

    const socialMedias = await SocialMedia.findAll({
      where: { entity_profile_id: profile.id },
    });

    return response.status(200).json(socialMedias);
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
