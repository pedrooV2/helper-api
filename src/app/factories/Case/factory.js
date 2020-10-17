import Case from '../../models/Case';
import File from '../../models/File';

export default () => {
  const caseModel = Case;
  const fileModel = File;

  return {
    caseModel,
    fileModel,
  };
};
