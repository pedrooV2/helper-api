import EntityProfile from '../models/EntityProfile';
import Phone from '../models/Phone';

class PhoneController {
  async store(request, response) {
    const { phone } = request.body;
    const { id: entityId } = request;

    const profile = await EntityProfile.findOne({
      where: { entity_id: entityId },
    });

    if (!profile) {
      return response.status(404).json({ error: 'Profile not found' });
    }

    const { id } = await Phone.create({ phone, entity_profile_id: profile.id });

    return response.status(201).json({ id, phone });
  }
}

export default new PhoneController();
