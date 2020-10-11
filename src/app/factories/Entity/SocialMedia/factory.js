import EntityProfile from '../../../models/EntityProfile';
import SocialMedia from '../../../models/SocialMedia';

export default () => {
  const entityProfileModel = EntityProfile;
  const socialMediaModel = SocialMedia;

  return {
    entityProfileModel,
    socialMediaModel,
  };
};
