import Donator from '../../models/Donator';

class DonatorController {
  async store(request, response) {
    const { email, password } = request.body;

    const donator = await Donator.findOne({
      where: { email },
    });

    if (!donator) {
      return response.status(404).json({ error: 'Donator not found' });
    }

    if (!(await donator.checkPassword(password))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    return response.status(201).json({
      donator,
      token: donator.generateToken(),
    });
  }
}

export default new DonatorController();
