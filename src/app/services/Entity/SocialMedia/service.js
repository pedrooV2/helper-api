import SocialMediaFactory from '../../../factories/Entity/SocialMedia/factory';

class SocialMediaService {
  constructor() {
    const { entityProfileModel, socialMediaModel } = SocialMediaFactory();

    this.entityProfileModel = entityProfileModel;
    this.socialMediaModel = socialMediaModel;
  }

  async create(payload) {
    const { entityId, name, link } = payload;

    const profile = await this.entityProfileModel.findOne({
      where: { entity_id: entityId },
    });

    if (!profile) {
      return {
        statusCode: 404,
        error: 'Profile not found',
      };
    }

    const { id } = await this.socialMediaModel.create({
      name,
      link,
      entity_profile_id: profile.id,
    });

    return {
      statusCode: 201,
      data: {
        id,
        name,
        link,
      },
    };
  }
}

export default SocialMediaService;
