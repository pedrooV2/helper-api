import Entity from '../../models/Entity';
import EntityProfile from '../../models/EntityProfile';
import Avatar from '../../models/Avatar';

export default () => {
  const entityModel = Entity;
  const entityProfileModel = EntityProfile;
  const avatarModel = Avatar;

  return {
    entityModel,
    entityProfileModel,
    avatarModel,
  };
};
