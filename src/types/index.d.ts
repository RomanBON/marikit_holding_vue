import { AxiosPromise } from 'axios';

declare global {
  type IRequestPromise<T = any> = AxiosPromise<T>;

  interface IState {
    products: IProduct[];
    categories: ICategory[];
    basket: IProduct[];
    exchangeRates: IExchangeRates;
  }

  interface IResponseWrap<T> {
    Error: string;
    Id: number;
    Success: boolean;
    Value: T;
  }

  interface IProductResponse {
    C: number; // price in dollars (USD)
    G: number; // group id
    P: number; // number of items in stock
    T: number; // product id
  }

  interface IProduct {
    id: number;
    name: string;
    categoryId: number;
    price: number;
    available: number;
    quantity: number;
  }

  interface ICategory {
    id: number;
    name: string;
  }

  interface IExchangeRates {
    rates: IRates;
    base: string;
    isIncreased: boolean;
  }

  interface IRates {
    RUB: number;
    USD: number;
    [key: string]: number;
  }

  interface INames {
    [key: number]: IName;
  }

  interface IName {
    G: string;
    B: IB;
  }

  interface IB {
    [key: string]: INT;
  }

  interface INT {
    N: string;
    T: number | string;
  }
}
