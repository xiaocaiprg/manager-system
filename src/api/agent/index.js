import { get } from "../index";

const PATH = {
  AGENT_LIST: "haiyang/agent/list",
};
const API = {
  getAgentList(params) {
    return get(PATH.AGENT_LIST, params)
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
