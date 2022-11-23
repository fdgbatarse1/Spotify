import categoriesHelper from '@/lib/categoriesHelper';

describe('Testing categoriesHelper', () => {

    const icon: SpotifyApi.ImageObject = {
        url: ''
    }

    const category: SpotifyApi.CategoryObject = {
        href: '',
        icons: [icon],
        id: '',
        name: 'test'
    }

  it('should return valid artist', () => {
    const expected = {
        name: 'test',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUAAACnej3aAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=',
        id: ''
      };

    const res = categoriesHelper({ category: category });
    expect(res).toMatchObject(expected);
  });
});
