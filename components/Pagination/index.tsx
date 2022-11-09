import Link from 'next/link';
import { useRouter } from 'next/router';
import range from 'lodash/range';

import { PaginationOptions } from '@/lib/enums';
import paginationHelper from '@/lib/paginationHelper';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useEffect, useMemo, useState } from 'react';

interface IPagination {
  path: string;
  total: number;
  customLimit?: number;
}

const Pagination = ({ path, total, customLimit }: IPagination) => {
  const [pages, setPages] = useState<number[]>();
  const router = useRouter();
  const { page, limit } = router.query;
  const { width } = useWindowDimensions();

  const defaultLimit = customLimit ? customLimit : PaginationOptions.limit;
  const pagination = paginationHelper({ page, limit, customLimit: defaultLimit });

  const calculatePages = useMemo(() => {
    let minLimit = 0;
    let maxLimit = 0;

    if (width < 640) {
      minLimit = 1;
      maxLimit = 2;
    } else {
      minLimit = 2;
      maxLimit = 3;
    }
    return range(pagination.page - minLimit, pagination.page + maxLimit);
  }, [pagination.page, width]);

  useEffect(() => {
    setPages(calculatePages);
  }, [calculatePages]);

  const lastPage = Math.ceil(total / pagination.limit);

  return (
    <>
      {pagination.limit < total && pages && (
        <nav>
          <ul className='flex justify-center items-center gap-6 text-gray-500 text-sm sm:text-base font-inter select-none'>
            {pagination.page > 1 && (
              <Link href={`${path}?page=${pagination.page - 1}&limit=${pagination.limit}`} passHref>
                <div className='cursor-pointer'>Previous</div>
              </Link>
            )}
            {pages.map((page) => {
              if (page > 0 && page < lastPage + 1 && lastPage) {
                return (
                  <Link href={`${path}?page=${page}&limit=${pagination.limit}`} passHref key={page}>
                    <div
                      className={`
                    cursor-pointer 
                    ${pagination.page === page ? 'text-green-500' : ''}
                  `}
                    >
                      {page}
                    </div>
                  </Link>
                );
              }
            })}
            {pagination.page < lastPage && (
              <Link href={`${path}?page=${pagination.page + 1}&limit=${pagination.limit}`} passHref>
                <div className='cursor-pointer'>Next</div>
              </Link>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Pagination;
