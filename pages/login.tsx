import Head from 'next/head';
import { useRouter } from 'next/router';
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { useSession } from 'next-auth/react';
import { FaSpotify } from '@react-icons/all-files/fa/FaSpotify';

import { Routes } from '@/lib/enums';

interface ILogin {
  providers?: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
}

const Login = ({ providers }: ILogin) => {
  const router = useRouter();
  const { status } = useSession();

  if (status === 'loading') {
    return <div className='min-h-screen bg-gray-50 dark:bg-gray-800' />;
  }

  if (status === 'authenticated') {
    router.push(Routes.HOME);
    return <div className='min-h-screen bg-gray-50 dark:bg-gray-800' />;
  }

  return (
    <div>
      <Head>
        <title>Log In | Spotify</title>
      </Head>
      <main className='flex flex-col justify-center items-center gap-12 px-4 w-full min-h-screen bg-gray-50 dark:bg-gray-800 text-center font-inter'>
        <div className='flex gap-4 items-center'>
          <FaSpotify fill='#22c55e' className='text-5xl md:text-7xl 2xl:text-8xl' />
          <p className='text-green-500 font-bold text-3xl md:text-5xl 2xl:text-6xl'>Spotify</p>
        </div>
        {providers &&
          Object.values(providers).map((provider) => (
            <button
              onClick={() => signIn(provider.id, { callbackUrl: Routes.HOME })}
              key={provider.name}
              className='px-4 py-2 md:px-6 md:py-3 rounded bg-green-500 hover:bg-green-400 text-gray-50 font-bold text-lg md:text-2xl 2xl:text-3xl'
            >
              Log In
            </button>
          ))}
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

export default Login;
