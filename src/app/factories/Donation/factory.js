import Case from '../../models/Case';
import Entity from '../../models/Entity';
import Donation from '../../models/Donation';
import Queue from '../../../libs/Queue';

export default () => {
  const CaseModel = Case;
  const DonationModel = Donation;
  const queue = Queue;
  const EntityModel = Entity;

  return {
    CaseModel,
    DonationModel,
    queue,
    EntityModel,
  };
};
