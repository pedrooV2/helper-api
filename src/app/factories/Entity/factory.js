import Entity from '../../models/Entity';
import EntityProfile from '../../models/EntityProfile';
import Avatar from '../../models/Avatar';
import Case from '../../models/Case';

export default () => {
  const entityModel = Entity;
  const entityProfileModel = EntityProfile;
  const avatarModel = Avatar;
  const caseModel = Case;

  return {
    entityModel,
    entityProfileModel,
    avatarModel,
    caseModel,
  };
};
