import Category from '@/components/Category';
import ErrorC from '@/components/Error';
import Header from '@/components/Header';
import Pagination from '@/components/Pagination';
import LoadingSection from '@/components/LoadingSection';

import useGetCategories from '@/hooks/useGetCategories';

import categoriesHelper from '@/lib/categoriesHelper';
import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';

const Categories = () => {
  useGetCategories(true);

  const categories = useAppSelector((state) => state.categories.categories);
  const categoriesStatus = useAppSelector((state) => state.categories.categoriesStatus);
  const categoriesError = useAppSelector((state) => state.categories.categoriesError);

  return (
    <>
      {categoriesStatus === Status.PENDING && <LoadingSection />}
      {categoriesStatus === Status.REJECTED && (
        <ErrorC error={categoriesError}>
          <Header goBack={true} />
        </ErrorC>
      )}
      {categoriesStatus === Status.FULFILLED && categories && (
        <div className='flex flex-col gap-6'>
          <Header goBack={true} />
          <div className='w-full flex justify-center'>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-xs sm:max-w-none'>
              {categories.items.map((newRelease) => {
                const category = categoriesHelper({ category: newRelease });
                return (
                  <Category
                    icon={category.icon}
                    name={category.name}
                    minWidth={false}
                    key={category.id}
                  />
                );
              })}
            </div>
          </div>
          <Pagination path='/categories' total={categories.total} />
        </div>
      )}
    </>
  );
};

export default Categories;
