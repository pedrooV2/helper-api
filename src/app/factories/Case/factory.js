import Case from '../../models/Case';
import File from '../../models/File';
import Donation from '../../models/Donation';
import Donator from '../../models/Donator';

export default () => {
  const caseModel = Case;
  const fileModel = File;
  const donationModel = Donation;
  const donatorModel = Donator;

  return {
    caseModel,
    fileModel,
    donationModel,
    donatorModel,
  };
};
