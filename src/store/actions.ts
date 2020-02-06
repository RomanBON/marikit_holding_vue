import { ActionTree } from 'vuex';

import {
  MIN_RUB_EX_RATE,
  MAX_RUB_EX_RATE,
  BASE_CURRENCY,
} from '../constants';
import {
  transformCategories,
  transformProducts,
  getRandomIntegerRange,
} from '../utils';
import {
  GET_CATEGORIES,
  GET_PRODUCTS,
  GET_EXCHANGE_RATES,
} from './types/actions.type';
import {
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_EXCHANGE_RATES,
} from './types/mutations.type';
import Api from '../api';

let typedCategories = [] as INames;

const actions: ActionTree<IState, IState> = {
  [GET_CATEGORIES] ({ commit }) {
    Api.getCategories()
      .then(response => {
        typedCategories = response.data as INames;
        commit(SET_CATEGORIES, transformCategories(typedCategories));
      });
  },
  [GET_PRODUCTS] ({ commit }) {
    Api.getProducts()
      .then(response => {
        commit(SET_PRODUCTS, transformProducts(response.data, typedCategories));
      });
  },
  [GET_EXCHANGE_RATES] ({ commit, state }) {
    const rateRub = getRandomIntegerRange(MIN_RUB_EX_RATE, MAX_RUB_EX_RATE);
    const isIncreased = rateRub > state.exchangeRates.rates.RUB;

    commit(SET_EXCHANGE_RATES, {
      rates: {
        RUB: rateRub,
        USD: 1,
      },
      base: BASE_CURRENCY,
      isIncreased,
    });
  },
};

export default actions;
