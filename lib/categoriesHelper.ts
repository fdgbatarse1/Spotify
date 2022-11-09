interface IcategoriesHelper {
  category: SpotifyApi.CategoryObject;
}

const categoriesHelper = ({ category }: IcategoriesHelper) => {
  const newCategory = {
    name: category.name ? category.name : 'Unknown',
    icon: category.icons[0].url
      ? category.icons[0].url
      : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEUAAACnej3aAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=',
    id: category.id,
  };
  return newCategory;
};

export default categoriesHelper;
