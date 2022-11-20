import Link from 'next/link';

interface IHorizontalList {
  title: string;
  href?: string;
  children: React.ReactNode;
}

const HorizontalList = ({ title, href, children }: IHorizontalList) => {
  return (
    <section className='flex flex-col gap-2'>
      <header className='flex justify-between items-center font-inter'>
        <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>{title}</h3>
        {href && (
          <Link href={href}>
            <a className='text-sm font-medium text-gray-500'>SEE ALL</a>
          </Link>
        )}
      </header>
      <main>
        <div className='overflow-x-auto'>
          <div className='flex flex-row gap-4 w-horizontal-list'>{children}</div>
        </div>
      </main>
    </section>
  );
};

export default HorizontalList;
