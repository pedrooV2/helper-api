import EntityFactory from '../../factories/Entity/factory';

class EntityService {
  constructor() {
    const { entityModel, entityProfileModel, avatarModel } = EntityFactory();

    this.entityModel = entityModel;
    this.entityProfileModel = entityProfileModel;
    this.avatarModel = avatarModel;
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

    const entity = await this.entityModel.create(payload);

    delete entity.dataValues.password_hash;
    delete entity.dataValues.password;

    return {
      statusCode: 201,
      data: {
        entity,
        token: entity.generateToken(),
      },
    };
  }

  async auth(payload) {
    const { email, password } = payload;

    const entity = await this.entityModel.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'password_hash'],
      include: [
        {
          model: this.entityProfileModel,
          as: 'profile',
          attributes: [
            'id',
            'cnpj',
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
              model: this.avatarModel,
              as: 'avatar',
              attributes: ['id', 'filepath', 'url'],
            },
          ],
        },
      ],
    });

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

    delete entity.dataValues.password_hash;

    return {
      statusCode: 201,
      data: {
        entity,
        token: entity.generateToken(),
      },
    };
  }
}

export default EntityService;
