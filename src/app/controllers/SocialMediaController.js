import EntityProfile from '../models/EntityProfile';
import SocialMedia from '../models/SocialMedia';

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

    const profile = await EntityProfile.findOne({
      where: { entity_id: entityId },
    });

    if (!profile) {
      return response.status(404).json({ error: 'Profile not found' });
    }

    const { id } = await SocialMedia.create({
      name,
      link,
      entity_profile_id: profile.id,
    });

    return response.status(201).json({ id, name, link });
  }
}

export default new SocialMediaController();
