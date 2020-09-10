import File from '../models/File';
import Case from '../models/Case';

class FileController {
  async store(request, response) {
    const caseId = request.params.id;

    const checkCaseExists = await Case.findByPk(caseId);

    if (!checkCaseExists) {
      return response.status(404).json({ error: 'Case not found' });
    }

    const { originalname: original_name, filename: filepath } = request.file;

    const file = await File.create({
      case_id: caseId,
      original_name,
      filepath,
    });

    return response.status(201).json(file);
  }
}

export default new FileController();
