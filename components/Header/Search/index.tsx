import { ChangeEvent, FormEvent } from 'react';
import { AiOutlineSearch } from '@react-icons/all-files/ai/AiOutlineSearch';
import throttle from 'lodash/throttle';

import useField from '@/hooks/useField';

import validator from '@/lib/validator';
import { Status } from '@/lib/enums';
import { useAppDispatch, useAppSelector } from '@/lib/reduxHooks';

import { setSearch, setSearchError, setSearchStatus } from '@/store/features/search/searchSlice';

const Search = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.searchQuery);

  const [search] = useField(
    {
      placeholder: 'Search',
      name: 'search',
      type: 'text',
      autoComplete: 'off',
      inputMode: 'text',
    },
    searchQuery,
  );

  const onSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newValue = e.target.value;
    search.setValue(newValue);
    const searchError = validator(newValue, true);

    if (searchError) {
      dispatch(setSearchStatus(Status.REJECTED));
      dispatch(setSearchError(searchError));
      dispatch(setSearch(''));
      return;
    }

    dispatch(setSearchStatus(Status.FULFILLED));
    dispatch(setSearchError(''));

    dispatch(setSearch(newValue));
  };

  return (
    <form onSubmit={onSubmitSearch} className='flex items-center w-full'>
      <button type='submit' className='p-2 rounded-l-full bg-gray-200'>
        <AiOutlineSearch className='text-gray-500 dark:text-gray-900' />
      </button>
      <label htmlFor='search' className='flex-auto'>
        <span className='absolute right-auto' style={{ left: '-999em' }}>
          search...
        </span>
        <input
          {...search.input}
          onChange={onChangeSearch}
          className='h-8 w-full outline-none rounded-r-full bg-gray-200 dark:text-black text-sm'
        />
      </label>
    </form>
  );
};

export default Search;
