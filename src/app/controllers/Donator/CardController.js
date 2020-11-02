import Card from '../../models/Card';

class CardController {
  async store(request, response) {
    const { id: donator_id } = request;

    const card = await Card.create({ donator_id, ...request.body });

    return response.status(201).json(card);
  }
}

export default new CardController();
