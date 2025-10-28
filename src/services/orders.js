import axios from "../helpers/AxiosHelper";
import { buildQueryString } from "../helpers/utils";


const getPagedOrders = (page, pageSize) => {
  const queryParams = buildQueryString({
    page,
    pageSize,
  });
  return axios.getData(`/api/Admin/GetPagedOrders?${queryParams}`, true);
};

const updateOrderStatus = (id, status) => {
  return axios.putData(`/api/Admin/UpdateOrderStatus?id=${id}&status=${status}`);
};

export const ordersService = {
  getPagedOrders, updateOrderStatus
};
