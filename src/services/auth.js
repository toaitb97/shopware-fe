import axios from "../helpers/AxiosHelper";

export const authService = {
  login
};

function login(o) {
  return axios.postData(`/login`, o, false);
}