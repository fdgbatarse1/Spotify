import { useRouter } from 'next/router';
import { MdKeyboardArrowLeft } from '@react-icons/all-files/md/MdKeyboardArrowLeft';

const LeftArrow = () => {
  const router = useRouter();
  return (
    <div onClick={() => router.back()}>
      <div className='p-1 bg-gray-200 rounded-full hover:opacity-70 cursor-pointer'>
        <MdKeyboardArrowLeft className='text-gray-500 text-2xl' />
      </div>
    </div>
  );
};

export default LeftArrow;
