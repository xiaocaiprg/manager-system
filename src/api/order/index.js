import { get } from "../index";

const PATH = {
  ORDER_LIST: "haiyang/order/",
};
const API = {
  getOrderList(params) {
    return get(PATH.ORDER_LIST, params)
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
