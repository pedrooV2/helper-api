import EntityProfile from '../../models/EntityProfile';
import Entity from '../../models/Entity';

class ProfileController {
  async store(request, response) {
    const { entity_id } = request.body;

    const verifyEntityExists = await Entity.findOne({
      where: { id: entity_id },
    });

    const verifyProfileExists = await EntityProfile.findOne({
      where: { entity_id },
    });

    if (!verifyEntityExists) {
      return response.status(400).json({ error: 'Entity does not exists.' });
    }

    if (verifyProfileExists) {
      return response
        .status(400)
        .json({ error: 'Entity Profile already exists' });
    }

    const profile = await EntityProfile.create(request.body);

    return response.status(201).json(profile);
  }
}

export default new ProfileController();
