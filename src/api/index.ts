import axios from 'axios';

const { BASE_URL } = process.env;

const Api = {
  getProducts: (): IRequestPromise<IResponseWrap<{ Goods: IProductResponse[] }>> =>
    axios.get(`${BASE_URL}data.json`),

  getCategories: (): IRequestPromise<INames> =>
    axios.get(`${BASE_URL}names.json`),
};

export default Api;
