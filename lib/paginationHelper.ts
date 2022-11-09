import { PaginationOptions } from '@/lib/enums';

interface IpaginationHelper {
  limit?: string | string[] | undefined;
  page?: string | string[] | undefined;
  customLimit?: number;
}

interface Ipagination {
  limit: number;
  offset: number;
  page: number;
  country: string;
  locale: string;
  market: string;
}

const paginationHelper = ({ limit, page, customLimit }: IpaginationHelper) => {
  const defaultLimit = customLimit ? customLimit : PaginationOptions.limit;
  const pagination: Ipagination = {
    ...PaginationOptions,
    limit: defaultLimit,
    offset: PaginationOptions.offset,
    page: 1,
  };
  try {
    pagination.limit = limit ? Number(limit) : defaultLimit;
    if (pagination.limit < 1) {
      throw Error('Invalid pagination limit');
    }
  } catch {
    pagination.limit = defaultLimit;
  }
  try {
    pagination.page = page ? Number(page) : pagination.page;
    if (pagination.page < 1) {
      throw Error('Invalid pagination page');
    }
  } catch {
    pagination.page = PaginationOptions.offset;
  }
  pagination.offset = (pagination.page - 1) * pagination.limit;
  return pagination;
};

export default paginationHelper;
