import { MutationTree } from 'vuex';

import {
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_EXCHANGE_RATES,
  ADD_TO_BASKET,
  REMOVE_FROM_BASKET,
  SET_QUANTITY,
} from './types/mutations.type';

interface IUseSetQuantityProps {
  product: IProduct;
  newQuantity: number;
}

const mutations: MutationTree<IState> = {
  [SET_CATEGORIES] (state, payload: ICategory[]) {
    state.categories.splice(0, state.categories.length, ...payload);
  },
  [SET_PRODUCTS] (state, payload: IProduct[]) {
    state.products.splice(0, state.products.length, ...payload);
  },
  [SET_EXCHANGE_RATES] (state, payload: IExchangeRates) {
    state.exchangeRates = Object.assign({}, payload);
  },
  [ADD_TO_BASKET] (state, product: IProduct) {
    const indexToAdd = state.basket.findIndex(item => item.id === product.id);
    const isIndexFounded = indexToAdd !== -1;
    let currentProduct;

    if (!isIndexFounded && product.available > 0) {
      const totalAddedProducts = state.basket.push(product);
      currentProduct = state.basket[totalAddedProducts - 1];
      currentProduct.quantity = 0;
    }

    if (isIndexFounded) {
      currentProduct = state.basket[indexToAdd];
    }

    if (
      currentProduct &&
      currentProduct.available > 0 &&
      currentProduct.quantity < currentProduct.available
    ) {
      currentProduct.quantity += 1;
    }
  },
  [REMOVE_FROM_BASKET] (state, id: number) {
    let index = state.basket.findIndex(item => item.id === id);
    state.basket.splice(index, 1);
  },
  [SET_QUANTITY] (state, payload) {
    const { product, newQuantity } = payload as IUseSetQuantityProps;

    const indexToQuantitySet = state.basket.findIndex(item => item.id === product.id);
    const productToQuantitySet = state.basket[indexToQuantitySet];
    if (
      newQuantity > 0 &&
      productToQuantitySet.available > 0 &&
      newQuantity <= productToQuantitySet.available
    ) {
      productToQuantitySet.quantity = newQuantity;
    }
  },
};

export default mutations;
