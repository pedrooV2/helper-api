import DonatorFactory from '../../factories/Donator/factory';

class DonatorService {
  constructor() {
    const { donatorModel, avatarModel } = DonatorFactory();

    this.donatorModel = donatorModel;
    this.avatarModel = avatarModel;
  }

  async create(payload) {
    const { email } = payload;

    const checkDonatorExists = await this.donatorModel.findOne({
      where: { email },
    });

    if (checkDonatorExists) {
      return {
        statusCode: 400,
        error: 'Donator email alredy exists',
      };
    }

    payload.city = payload.city.toLowerCase();
    payload.state = payload.state.toUpperCase();

    const donator = await this.donatorModel.create(payload);

    const { id, full_name, phone, state, city, avatar_id } = donator;

    let avatar = null;

    if (avatar_id) {
      avatar = await this.avatarModel.findByPk(avatar_id, {
        attributes: ['id', 'filepath', 'url'],
      });
    }

    return {
      statusCode: 201,
      data: {
        donator: {
          id,
          full_name,
          phone,
          state,
          city,
          avatar,
          email,
        },
        token: donator.generateToken(),
      },
    };
  }

  async auth(payload) {
    const { email, password } = payload;

    const donator = await this.donatorModel.findOne({
      where: { email },
      include: [
        {
          model: this.avatarModel,
          as: 'avatar',
          attributes: ['id', 'filepath', 'url'],
        },
      ],
    });

    if (!donator) {
      return {
        statusCode: 404,
        error: 'Donator not found',
      };
    }

    if (!(await donator.checkPassword(password))) {
      return {
        statusCode: 401,
        error: 'Password does not match',
      };
    }

    const { full_name, phone, avatar, id, city, state } = donator;

    return {
      statusCode: 201,
      data: {
        donator: { full_name, phone, avatar, id, city, state, email },
        token: donator.generateToken(),
      },
    };
  }
}

export default DonatorService;
