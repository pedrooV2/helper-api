import Case from '../../models/Case';
import Entity from '../../models/Entity';
import Donation from '../../models/Donation';
import Donator from '../../models/Donator';
import Queue from '../../../libs/Queue';

export default () => {
  const CaseModel = Case;
  const DonationModel = Donation;
  const queue = Queue;
  const EntityModel = Entity;
  const DonatorModel = Donator;

  return {
    CaseModel,
    DonationModel,
    queue,
    EntityModel,
    DonatorModel,
  };
};
