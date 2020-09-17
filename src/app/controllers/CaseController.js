import Case from '../models/Case';

class CaseController {
  async store(request, response) {
    request.body.entity_id = request.id;

    const caseModel = await Case.create(request.body);

    return response.status(201).json(caseModel);
  }
}
export default new CaseController();
