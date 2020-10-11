import EntityProfileFactory from '../../../factories/Entity/Profile/factory';

class EntityProfileService {
  constructor() {
    const { entityModel, entityProfileModel } = EntityProfileFactory();

    this.entityModel = entityModel;
    this.entityProfileModel = entityProfileModel;
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
}

export default EntityProfileService;
