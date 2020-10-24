import EntityProfileFactory from '../../../factories/Entity/Profile/factory';

class EntityProfileService {
  constructor() {
    const {
      entityModel,
      entityProfileModel,
      avatarModel,
    } = EntityProfileFactory();

    this.entityModel = entityModel;
    this.entityProfileModel = entityProfileModel;
    this.avatarModel = avatarModel;
  }

  async create(payload) {
    const { entity_id } = payload;

    const verifyEntityExists = await this.entityModel.findOne({
      where: { id: entity_id },
    });

    const verifyProfileExists = await this.entityProfileModel.findOne({
      where: { entity_id },
    });

    if (!verifyEntityExists) {
      return {
        statusCode: 400,
        error: 'Entity does not exists.',
      };
    }

    if (verifyProfileExists) {
      return {
        statusCode: 400,
        error: 'Entity Profile already exists',
      };
    }

    const {
      id,
      cnpj,
      initials,
      description,
      whatsapp,
      street,
      number,
      neighborhood,
      city,
      state,
    } = await this.entityProfileModel.create(payload);

    return {
      statusCode: 201,
      data: {
        id,
        cnpj,
        initials,
        description,
        whatsapp,
        street,
        number,
        neighborhood,
        city,
        state,
        entity_id,
      },
    };
  }

  async getByEntityId(payload) {
    const { entity_id } = payload;

    const profile = await this.entityProfileModel.findOne({
      where: { entity_id },
      attributes: [
        'id',
        'cnpj',
        'initials',
        'description',
        'whatsapp',
        'street',
        'number',
        'neighborhood',
        'city',
        'state',
      ],
      include: [
        {
          model: this.entityModel,
          as: 'entity',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: this.avatarModel,
          as: 'avatar',
          attributes: ['id', 'url', 'filepath'],
        },
      ],
    });

    if (!profile) {
      return {
        statusCode: 404,
        error: 'Profile not found',
      };
    }

    return {
      statusCode: 200,
      data: profile.get(),
    };
  }

  async update(payload) {
    const { avatar_id, entity_id } = payload;

    if (avatar_id) {
      const avatar = await this.avatarModel.findByPk(avatar_id);

      if (!avatar) {
        return {
          statusCode: 404,
          error: 'Avatar not found',
        };
      }
    }

    const profile = await this.entityProfileModel.update(payload, {
      where: { entity_id },
    });

    return {
      statusCode: 200,
      data: profile,
    };
  }
}

export default EntityProfileService;
