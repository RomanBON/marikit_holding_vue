export default function transformProducts (
  categories: INames
): ICategory[] {
  return categories && Object.keys(categories).map((categoryId: string): ICategory => {
    const categoryIdToNumber = Number(categoryId);

    return {
      id: categoryIdToNumber,
      name: categories[categoryIdToNumber].G,
    };
  });
}
