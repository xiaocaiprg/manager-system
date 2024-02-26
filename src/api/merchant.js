import http from "./index";

const PATH = {
  MERCHANT_LIST: "haiyang/merchant/list",
};
const API = {
  getMerchantList(params) {
    return http
      .get(PATH.MERCHANT_LIST, params)
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
