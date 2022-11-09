import Category from '@/components/Category';
import ErrorMessage from '@/components/Error/Message';
import HorizontalList from '@/components/HorizontalList';

import { Status } from '@/lib/enums';
import { useAppSelector } from '@/lib/reduxHooks';
import categoriesHelper from '@/lib/categoriesHelper';

const CategoriesPrev = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const categoriesStatus = useAppSelector((state) => state.categories.categoriesStatus);
  const categoriesError = useAppSelector((state) => state.categories.categoriesError);

  return (
    <HorizontalList title='Categories' href='/categories'>
      {categoriesStatus === Status.REJECTED && <ErrorMessage error={categoriesError} />}
      {categoriesStatus === Status.FULFILLED &&
        categories &&
        categories.items.map((category) => {
          const newCategory = categoriesHelper({ category });
          return (
            <Category
              name={newCategory.name}
              icon={newCategory.icon}
              minWidth={true}
              key={newCategory.id}
            />
          );
        })}
    </HorizontalList>
  );
};

export default CategoriesPrev;
