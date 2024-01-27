import { get } from "../index";

const PATH = {
  PRODUCT_LIST: "haiyang/product",
};
const API = {
  getProductList(params) {
    return get(PATH.PRODUCT_LIST, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
};
export default API;
