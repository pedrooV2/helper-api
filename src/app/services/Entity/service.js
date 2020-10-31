import { Op } from 'sequelize';
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

  async update(payload) {
    const { email, oldPassword, entity_id } = payload;

    const entity = await this.entityModel.findByPk(entity_id);

    if (email && email !== entity.email) {
      const usersExists = await this.entityModel.findOne({
        where: { email },
      });

      if (usersExists)
        return {
          statusCode: 400,
          error: 'Entity already exists',
        };
    }

    if (oldPassword && !(await entity.checkPassword(oldPassword))) {
      return {
        statusCode: 401,
        error: 'Password does not match',
      };
    }

    await entity.update(payload);

    return {
      statusCode: 204,
    };
  }

  async getByLocation(payload) {
    const { city, state, limit, page } = payload;

    const profiles = await this.entityProfileModel.findAll({
      where: {
        city: {
          [Op.like]: `%${city}%`,
        },
        state: {
          [Op.like]: `%${state}%`,
        },
      },
      include: [
        { model: this.entityModel, as: 'entity', attributes: ['id', 'name'] },
      ],
      order: [['created_at', 'DESC']],
      limit,
      offset: (page - 1) * limit,
    });

    const totalRecords = await this.entityProfileModel.count({
      where: {
        city: {
          [Op.like]: `%${city}%`,
        },
        state: {
          [Op.like]: `%${state}%`,
        },
      },
    });
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      statusCode: 200,
      data: { profiles, totalPages, totalRecords },
    };
  }
}

export default EntityService;
