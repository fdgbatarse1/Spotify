import { Session } from 'next-auth';

interface IavatarHelper {
  session: Session | null;
}

const avatarHelper = ({ session }: IavatarHelper) => {
  const avatar = {
    name: session?.user?.name ? session?.user?.name : 'User',
    src: session?.user?.image ? session?.user?.image : '/images/profile.png',
    alt: session?.user?.name ? session?.user.name + ' avatar' : 'User avatar',
  };
  return avatar;
};

export default avatarHelper;
