import EntityPhoneService from '../services/Entity/Phone/service';

class PhoneController {
  async store(request, response) {
    const { phone } = request.body;
    const { id: entityId } = request;

    const { statusCode, data, error } = await new EntityPhoneService().create({
      phone,
      entityId,
    });

    if (error) {
      return response.status(statusCode).json({ error });
    }

    return response.status(statusCode).json({ ...data });
  }
}

export default new PhoneController();
