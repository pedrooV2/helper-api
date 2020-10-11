import Entity from '../../../models/Entity';
import EntityProfile from '../../../models/EntityProfile';

export default () => {
  const entityModel = Entity;
  const entityProfileModel = EntityProfile;

  return {
    entityModel,
    entityProfileModel,
  };
};
