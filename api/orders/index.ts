import apiFetch from "@/helpers/interceptors";

export const createOrders = async (body: object) => {
  const link = "/order/insert";
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const getHistoryOrders = async () => {
  const link = "/order/all/user";
  const { data } = await apiFetch.get(link);
  return data;
};

export const checkStatusOfOrder = async (orderId:string) => {
  const link = `/order/check-status?orderId=${orderId}`;
  const { data } = await apiFetch.get(link);
  return data;
};