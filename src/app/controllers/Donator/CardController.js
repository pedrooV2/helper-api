import Card from '../../models/Card';

class CardController {
  async store(request, response) {
    const { id: donator_id } = request;

    const card = await Card.create({ donator_id, ...request.body });

    return response.status(201).json(card);
  }

  async index(request, response) {
    const { id: donator_id } = request;

    const cards = await Card.findAll({
      where: { donator_id },
      attributes: ['id', 'number', 'cvv', 'nickname', 'expiration_date', 'cpf'],
    });

    return response.json(cards);
  }
}

export default new CardController();
