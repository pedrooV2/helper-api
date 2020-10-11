import Case from '../../models/Case';
import Donation from '../../models/Donation';

export default () => {
  const CaseModel = Case;
  const DonationModel = Donation;

  return {
    CaseModel,
    DonationModel,
  };
};
