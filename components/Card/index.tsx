import Link from 'next/link';
import Image from 'next/image';

interface ICard {
  image: string;
  title: string;
  content?: string;
  href: string;
  minWidth: boolean;
  rounded?: boolean;
}

const Card = ({ image, title, content, href, minWidth, rounded }: ICard) => {
  return (
    <Link href={href} passHref>
      <div className='flex flex-col gap-4 p-4 bg-gray-100 select-none cursor-pointer rounded'>
        <div className={`relative aspect-square ${minWidth ? 'min-w-200px' : 'min-w-140px'}`}>
          <Image
            src={image}
            alt={title}
            layout='fill'
            className={rounded ? 'rounded-full' : 'rounded'}
          />
        </div>
        <div className='flex flex-col gap-0.5'>
          <h5 className='font-inter text-sm md:text-base font-bold text-gray-900'>{title}</h5>
          {content && (
            <h6 className='font-inter text-xs md:text-sm font-normal text-gray-500 capitalize'>
              {content}
            </h6>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Card;
