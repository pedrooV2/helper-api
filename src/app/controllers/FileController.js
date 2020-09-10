import fs from 'fs';
import { resolve } from 'path';
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

    const filesCounter = await File.count({
      where: { case_id: caseId },
    });

    if (filesCounter >= 4) {
      fs.unlinkSync(
        `${resolve(
          __dirname,
          '..',
          '..',
          '..',
          'tmp',
          'uploads',
          'files'
        )}/${filepath}`
      );

      return response.status(400).json({
        error: 'Not is possible upload more than four files per case',
      });
    }

    const file = await File.create({
      case_id: caseId,
      original_name,
      filepath,
    });

    return response.status(201).json(file);
  }
}

export default new FileController();
