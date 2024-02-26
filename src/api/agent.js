import http from "./index";

const PATH = {
  AGENT_LIST: "haiyang/agent/list",
  ADD_INTERGRAL: "haiyang/integral/add",
};
const API = {
  getAgentList(params) {
    return http
      .get(PATH.AGENT_LIST, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  addIntergral(params) {
    return http
      .post(PATH.ADD_INTERGRAL, params)
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
