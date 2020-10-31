import Case from '../../models/Case';
import File from '../../models/File';
import Donation from '../../models/Donation';
import Donator from '../../models/Donator';
import Entity from '../../models/Entity';
import EntityProfile from '../../models/EntityProfile';

export default () => {
  const caseModel = Case;
  const fileModel = File;
  const donationModel = Donation;
  const donatorModel = Donator;
  const entityModel = Entity;
  const entityProfileModel = EntityProfile;

  return {
    caseModel,
    fileModel,
    donationModel,
    donatorModel,
    entityModel,
    entityProfileModel,
  };
};
