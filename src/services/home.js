import axios from "../helpers/AxiosHelper";
import { buildQueryString } from "../helpers/utils";


const getPagedProducts = (gender, productType, productStyle, ageGroup, minPrice, maxPrice, page, pageSize) => {
  const queryParams = buildQueryString({
    gender,
    productType,
    productStyle,
    ageGroup,
    minPrice,
    maxPrice,
    page,
    pageSize,
  });
  return axios.getData(`/api/Home/GetPagedProducts?${queryParams}`);
};

const createOrder = (orderRequest) => {
  return axios.postData("/api/Home/CreateOrder", orderRequest);
};


export const homeService = {
  getPagedProducts, createOrder
};
