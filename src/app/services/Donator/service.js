import DonatorFactory from '../../factories/Donator/factory';

class DonatorService {
  constructor() {
    const { donatorModel } = DonatorFactory();

    this.donatorModel = donatorModel;
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
}

export default DonatorService;
