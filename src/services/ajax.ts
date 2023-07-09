import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4500/api/v1",
});

// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log("🚀 ~ file: ajax.ts:13 ~ error:", error)
    return Promise.resolve(error.response);
  }
);

export default instance;
