import fs from 'fs';
import { resolve } from 'path';
import File from '../models/File';
import Case from '../models/Case';
import Cache from '../../libs/Cache';

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

  async destroy(request, response) {
    const { caseId, id } = request.params;
    const { id: entity_id } = request;

    const caseModel = await Case.findByPk(caseId);

    if (!caseModel) {
      return response.status(404).json({ error: 'Case not found' });
    }

    if (caseModel.entity_id !== entity_id) {
      return response.status(403).json({ error: 'Operation not permitted' });
    }

    const file = await File.findOne({ where: { id, case_id: caseModel.id } });

    if (!file) {
      return response.status(404).json({ error: 'File not found' });
    }

    await file.destroy();

    await Cache.invalidate(`entity:${entity_id}:case:${caseId}`);

    return response.status(204).json();
  }
}

export default new FileController();
