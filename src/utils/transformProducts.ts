export default function transformProducts (
  products: IResponseWrap<{ Goods: IProductResponse[] }>,
  categoriesPayload: INames
): IProduct[] {
  return products.Value.Goods.map((product: IProductResponse): IProduct => ({
    id: product.T,
    name: categoriesPayload[product.G].B[product.T].N,
    categoryId: product.G,
    price: product.C,
    available: product.P,
    quantity: 0,
  }));
}
