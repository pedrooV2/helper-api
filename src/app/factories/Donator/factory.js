import Donator from '../../models/Donator';
import Avatar from '../../models/Avatar';

export default () => {
  const donatorModel = Donator;
  const avatarModel = Avatar;

  return {
    donatorModel,
    avatarModel,
  };
};
