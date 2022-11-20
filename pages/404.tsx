import Head from 'next/head';
import Link from 'next/link';

import { Routes } from '@/lib/enums';

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Not Found | Spotify</title>
        <meta
          name='description'
          content='Music webapp that use spotify API to find the right music or podcast for every moment'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex flex-col justify-center items-center gap-6 2xl:gap-12 px-4 w-full min-h-screen bg-gray-50 dark:bg-gray-800 text-center font-inter'>
        <div className='flex flex-col justify-center items-center gap-1 2xl:gap-6 text-green-500 dark:text-red-300'>
          <h2 className='font-extrabold text-lg md:text-2xl 2xl:text-5xl'>Page not found</h2>
          <p className='font-normal text-base md:text-lg 2xl:text-2xl'>
            We can&apos;t seem to find the page you are looking for.
          </p>
        </div>
        <Link href={Routes.HOME} passHref>
          <button className='px-4 py-2 md:px-6 md:py-3 rounded bg-green-500 hover:bg-green-400 text-gray-50 font-bold text-lg md:text-2xl 2xl:text-3xl'>
            home
          </button>
        </Link>
      </main>
    </>
  );
};

export default NotFound;
