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

  async auth(payload) {
    const { email, password } = payload;

    const entity = await this.entityModel.findOne({ where: { email } });

    if (!entity) {
      return {
        statusCode: 404,
        error: 'Entity not found',
      };
    }

    if (!(await entity.checkPassword(password))) {
      return {
        statusCode: 401,
        error: 'Password does not match',
      };
    }

    const { id } = entity;

    return {
      statusCode: 201,
      data: {
        entity: {
          id,
          email,
        },
        token: entity.generateToken(),
      },
    };
  }
}

export default EntityService;
