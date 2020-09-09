import Donator from '../../models/Donator';
import Avatar from '../../models/Avatar';

class DonatorController {
  async store(request, response) {
    const { email, password } = request.body;

    const donator = await Donator.findOne({
      where: { email },
      include: [
        { model: Avatar, as: 'avatar', attributes: ['id', 'filepath', 'url'] },
      ],
    });

    if (!donator) {
      return response.status(404).json({ error: 'Donator not found' });
    }

    if (!(await donator.checkPassword(password))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    const { full_name, phone, avatar } = donator;

    return response.status(201).json({
      donator: { full_name, email, phone, avatar },
      token: donator.generateToken(),
    });
  }
}

export default new DonatorController();
