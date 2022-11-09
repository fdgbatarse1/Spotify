import Image from 'next/image';

interface ICategory {
  name: string;
  icon: string;
  minWidth: boolean;
}

const Category = ({ name, icon, minWidth }: ICategory) => {
  return (
    <div
      className={`relative flex justify-center items-end ${
        minWidth ? 'min-w-200px' : ''
      } h-200px p-6`}
    >
      <Image src={icon} alt={name} layout='fill' className='rounded' />
      <p className='text-inter text-base md:text-large text-center text-gray-50 z-10'>{name}</p>
    </div>
  );
};

export default Category;
