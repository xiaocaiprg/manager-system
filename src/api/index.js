import axios from "axios";
const instance = axios.create({
  baseURL: "http://www.enjoyclub.shop/",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
const post = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
export { get, post };
