import { FaSpotify } from '@react-icons/all-files/fa/FaSpotify';

const Loading = () => {
  return (
    <main className='flex flex-col justify-center items-center gap-6 h-full w-full bg-gray-50'>
      <FaSpotify fill='#22c55e' className='text-5xl md:text-7xl animate-bounce' />
      <p className='text-green-500 font-bold text-xl md:text-3xl font-inter'>Loading...</p>
    </main>
  );
};

export default Loading;
