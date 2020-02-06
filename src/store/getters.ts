import { GetterTree } from 'vuex';

import { convertToNumber, formatCurrency } from '../utils';
import { CURRENT_CURRENCY } from '../constants';

const getters: GetterTree<IState, {}> = {
  categories: (state) => state.categories,
  products: (state) => state.products,
  basket: (state) => state.basket,
  exchangeRates: (state) => state.exchangeRates,
  isCurrencyIncreased: (state) => state.exchangeRates.isIncreased,
  getConvertedPrice: (state: IState, getters) => (price: number) => {
    return convertToNumber(price * state.exchangeRates.rates[getters.getCurrency]);
  },
  getCurrency: () => CURRENT_CURRENCY,
  getFormattedPrice: (state, getters) => (price: number) => {
    return formatCurrency(getters.getConvertedPrice(price));
  },
  getProductsByCategoryId: (state: IState) => (id: number) => {
    return state.products.filter((product: IProduct) => product.categoryId === id);
  },
  getProductFromBasketById: (state, getters) => (id: number) => {
    return getters
      .basket
      .find((product: IProduct) => product.id === id)
    ;
  },
  getCategoryAppropriateProductById: (state, getters) => (id: number) => {
    return getters
      .categories
      .find((category: ICategory) => category.id === id)
    ;
  },
  getTotalAmount: (state, getters) => {
    return getters
      .basket
      .reduce((result: number, p: IProduct) =>
        result + convertToNumber(p.price * p.quantity), 0
      )
    ;
  },
  getFormattedTotalAmount: (state, getters) => {
    return getters.getFormattedPrice(getters.getTotalAmount);
  },
  getQuantityFromBasketById: (state, getters) => (id: number) => {
    const productFromBasket = getters.getProductFromBasketById(id);

    if (productFromBasket) {
      return productFromBasket.quantity;
    }

    return 0;
  },
  isShowDeleteButton: (state, getters) => (id: number) => {
    const product = getters.getProductFromBasketById(id);
    if (product) {
      return true;
    }

    return false;
  },
  isDisabledAddButton: (state, getters) => (id: number, available: number) => {
    const product = getters.getProductFromBasketById(id);
    if (product && product.quantity === available) {
      return true;
    }

    return false;
  },
};

export default getters;
