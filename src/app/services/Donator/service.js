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

    const { id, full_name, phone, avatar_id } = await this.donatorModel.create(
      payload
    );

    return {
      statusCode: 201,
      data: {
        id,
        full_name,
        phone,
        avatar_id,
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

    const { full_name, phone, avatar, id } = donator;

    return {
      statusCode: 201,
      data: {
        donator: { full_name, phone, avatar, id },
        token: donator.generateToken(),
      },
    };
  }
}

export default DonatorService;
