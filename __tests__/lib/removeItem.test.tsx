import removeItem from '@/lib/removeItem';

describe('Testing removeItem', () => {
  it('should removeItem from number array', () => {
    const res = removeItem<number>([1, 2, 3, 4, 5], 1);
    expect(res).toMatchObject([2, 3, 4, 5]);
  });

  it("shouldn't removeItem from number array", () => {
    const res = removeItem<number>([1, 2, 3, 4, 5], 10);
    expect(res).toMatchObject([1, 2, 3, 4, 5]);
  });

  it("shouldn't removeItem from number empty array", () => {
    const res = removeItem<number>([], 10);
    expect(res).toMatchObject([]);
  });
});
