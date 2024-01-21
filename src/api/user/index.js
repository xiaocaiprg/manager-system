import { get } from "../index";

const PATH = {
  USER_LIST: "haiyang/user/list",
};
const API = {
  getUserList(params) {
    return get(PATH.USER_LIST, params)
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
