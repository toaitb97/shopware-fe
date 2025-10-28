import axios from "axios";

// set default baseURL
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// axios.defaults.baseURL = "http://localhost:5077";
axios.defaults.baseURL = "https://shopware-api-960942081397.us-west1.run.app";
// create a response interceptor to check for 401s
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Xóa token & redirect về trang signin
        localStorage.removeItem("accessToken");
        localStorage.removeItem("tokenExpiry");
        if (typeof window !== "undefined") {
          window.location.href = "/signin";
        }
      }
    }

    return Promise.reject(error);
  }
);

// create a default instance of axios
const instance = axios.create({
  responseType: "json",
});

//#region generic crud methods
instance.getData = (url, needsAuth) => {
  const requestOptions =
    needsAuth === true || needsAuth === undefined
      ? { headers: authHeader() }
      : {};

  return new Promise((resolve, reject) => {
    axios
      .get(url, requestOptions)
      .then((res) => resolve(res.data))
      .catch((res) => reject(formatReject(res)));
  });
};

instance.upsertData = (id, url, data, needsAuth) => {
  if (id === undefined || id === null || id === 0 || id === "")
    return instance.postData(url, data, needsAuth);
  else return instance.putData(`${url}/${id}`, data, needsAuth);
};

instance.postData = (url, data, needsAuth, contentType) => {
  const requestOptions =
    needsAuth === true || needsAuth === undefined
      ? { headers: authHeader(contentType) }
      : {};

  return new Promise((resolve, reject) => {
    axios
      .post(url, data, requestOptions)
      .then((res) => resolve(res))
      .catch((res) => reject(formatReject(res)));
  });
};

instance.putData = (url, data, needsAuth) => {
  const requestOptions =
    needsAuth === true || needsAuth === undefined
      ? { headers: authHeader() }
      : {};

  return new Promise((resolve, reject) => {
    axios
      .put(url, data, requestOptions)
      .then((res) => resolve(res.data))
      .catch((res) => reject(formatReject(res)));
  });
};

instance.deleteData = (url) => {
  const requestOptions = { headers: authHeader() }; // deletes always need security

  return new Promise((resolve, reject) => {
    axios
      .delete(url, requestOptions)
      .then((res) => resolve(res.data))
      .catch((res) => reject(formatReject(res)));
  });
};

instance.deleteMultipleData = (url, ids) => {
  const requestOptions = {
    headers: authHeader(), // deletes always need security
    data: { ids },
  };

  return new Promise((resolve, reject) => {
    axios
      .delete(url, requestOptions)
      .then((res) => resolve(res.data))
      .catch((res) => reject(formatReject(res)));
  });
};

function formatReject(res) {
  if (res === null) return "error";

  if (res.response) {
    if (Array.isArray(res.response.data)) {
      let m = res.response.data.map((o) => o.description);
      return m.join("\n");
    }
    return res.response.data;
  } else if (res.request) {
    return "network error";
  } else return "error";
}
//#endregion

export default instance;

// ✅ Sửa lại hàm authHeader để lấy accessToken
export function authHeader(contentType) {
  contentType = contentType ?? "application/json";
  const token = localStorage.getItem("accessToken");

  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": contentType,
    };
  } else {
    return { "Content-Type": contentType };
  }
}
