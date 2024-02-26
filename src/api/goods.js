import http from "./index";

const PATH = {
  PRODUCT_LIST: "haiyang/product",
  UPDATE_RATE: "haiyang/product/updateRate",
  UPDATE_STATUS: "haiyang/product/updateStatus",
};
const API = {
  getProductList(params) {
    return http
      .get(PATH.PRODUCT_LIST, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  updateRate(params) {
    return http
      .put(PATH.UPDATE_RATE, params)
      .then(res => {
        if (res.code === 200) {
          throw new Error("Error message");
          // return res.success;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  updateStatus(params) {
    return http
      .put(PATH.UPDATE_STATUS, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
};
export default API;
