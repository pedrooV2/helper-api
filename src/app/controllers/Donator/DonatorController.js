import Donator from '../../models/Donator';

class DonatorController {
  async store(request, response) {
    const { email } = request.body;

    const checkDonatorExists = await Donator.findOne({
      where: { email },
    });

    if (checkDonatorExists) {
      return response
        .status(400)
        .json({ error: 'Donator email alredy exists' });
    }

    const donator = await Donator.create(request.body);

    return response.status(201).json(donator);
  }
}

export default new DonatorController();
