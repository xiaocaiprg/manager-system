import http from "../api/index";
const PATH = {
  GET_ADMIN_INFO: "haiyang/admin/token",
};
export const mixins = {
  mounted() {},
  methods: {
    getLocalStorage() {
      const authorization = window.localStorage.getItem("g-authorization");
      return authorization;
    },
    setLocalStorage(value) {
      window.localStorage.setItem("g-authorization", value);
    },
    getAdminInfo() {
      const authorization = this.getLocalStorage() || "";
      if (authorization) {
        return http
          .get(`${PATH.GET_ADMIN_INFO}`)
          .then(res => {
            if (res.code === 200) {
              return res.result;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        return Promise.resolve("");
      }
    },
  },
};
