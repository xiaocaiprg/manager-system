import http from "./index";

const PATH = {
  LOGIN: "haiyang/admin/login",
  LOGIN_OUT: "haiyang/admin/loginout",
};
const API = {
  adminLogin(params) {
    return http
      .loginPost(PATH.LOGIN, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  adminLoginOut() {
    return http
      .post(PATH.LOGIN_OUT)
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
