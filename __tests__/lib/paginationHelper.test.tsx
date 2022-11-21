import paginationHelper from '@/lib/paginationHelper';

describe('Testing paginationHelper', () => {
  it('should return valid pagination', () => {
    const limit = '10';
    const page = '1'

    const expected = {
        limit: 10,
        offset: 0,
        page: 1,
        country: "SV",
        locale: "es_SV",
        market: "SV",
    }

    const res = paginationHelper({limit: limit, page: page});
    expect(res).toMatchObject(expected);
  });

  it('should return valid pagination even though input is invalid', () => {
    const limit = '-1';
    const page = '-1'

    const expected = {
        limit: 12,
        offset: -12,
        page: 0,
        country: "SV",
        locale: "es_SV",
        market: "SV",
    }

    const res = paginationHelper({limit: limit, page: page});
    expect(res).toMatchObject(expected);
  });
});
