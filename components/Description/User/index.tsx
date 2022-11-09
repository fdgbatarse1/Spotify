import Image from 'next/image';

import userHelper from '@/lib/userHelper';
import { useAppSelector } from '@/lib/reduxHooks';

const UserDescription = () => {
  const user = useAppSelector((state) => state.user.userProfile);

  const newUser = userHelper({ user });

  return (
    <header className='flex flex-col 2xl:flex-row items-center 2xl:items-end gap-6'>
      <div className={`relative aspect-square w-200px sm:w-200px 2xl:w-300px`}>
        <Image src={newUser.image} alt={newUser.name} layout='fill' className='rounded-full' />
      </div>
      <div className='flex flex-col gap-2 2xl:gap-6'>
        <div className='flex justify-center items-center 2xl:justify-start gap-2 w-full'>
          <h2 className='font-bold text-sm 2xl:text-base text-center 2xl:text-left capitalize'>
            {newUser.type}
          </h2>
        </div>
        <h1 className='font-bold text-4xl 2xl:text-6xl text-center 2xl:text-left'>
          {newUser.name}
        </h1>
        <div className='flex flex-row items-center 2xl:items-center gap-4 2xl:gap-6 font-medium'>
          <div className='flex items-center gap-2 2xl:gap-6 text-center 2xl:text-left'>
            <p>
              {newUser.followers}
              {newUser.followers === 1 ? <> Follower</> : <> Followers</>}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserDescription;
