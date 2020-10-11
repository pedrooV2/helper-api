import EntityPhoneFactory from '../../../factories/Entity/Phone/factory';

class EntityPhoneService {
  constructor() {
    const { entityProfileModel, phoneModel } = EntityPhoneFactory();

    this.entityProfileModel = entityProfileModel;
    this.phoneModel = phoneModel;
  }

  async create(payload) {
    const { entityId, phone } = payload;

    const profile = await this.entityProfileModel.findOne({
      where: { entity_id: entityId },
    });

    if (!profile) {
      return {
        statusCode: 404,
        error: 'Profile not found',
      };
    }

    const { id } = await this.phoneModel.create({
      phone,
      entity_profile_id: profile.id,
    });

    return {
      statusCode: 201,
      data: {
        id,
        phone,
      },
    };
  }
}

export default EntityPhoneService;
