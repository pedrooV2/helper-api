import EntityFactory from '../../factories/Entity/factory';

class EntityService {
  constructor() {
    const { entityModel } = EntityFactory();

    this.entityModel = entityModel;
  }

  async create(payload) {
    const { email } = payload;

    const entityExists = await this.entityModel.findOne({
      where: { email },
    });

    if (entityExists) {
      return {
        statusCode: 400,
        error: 'Entity email already exists',
      };
    }

    const { id, name } = await this.entityModel.create(payload);

    return {
      statusCode: 201,
      data: {
        id,
        name,
        email,
      },
    };
  }
}

export default EntityService;
