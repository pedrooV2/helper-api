import Case from '../../models/Case';
import Donation from '../../models/Donation';
import Queue from '../../../libs/Queue';

export default () => {
  const CaseModel = Case;
  const DonationModel = Donation;
  const queue = Queue;

  return {
    CaseModel,
    DonationModel,
    queue,
  };
};
