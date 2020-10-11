import EntityProfile from '../../../models/EntityProfile';
import Phone from '../../../models/Phone';

export default () => {
  const entityProfileModel = EntityProfile;
  const phoneModel = Phone;

  return {
    entityProfileModel,
    phoneModel,
  };
};
