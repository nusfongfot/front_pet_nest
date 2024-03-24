import apiFetch from "@/helpers/interceptors";

export const createCart = async (body: object) => {
  const link = "/cart/insert";
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const getAllCarts = async () => {
  const link = "/cart/all";
  const { data } = await apiFetch.get(link);
  return data;
};

export const deleteCarts = async (id: string) => {
  const link = `/cart/delete?cartId=${id}`;
  const { data } = await apiFetch.delete(link);
  return data;
};

export const getHistoryCarts = async () => {
  const link = `/cart/history`;
  const { data } = await apiFetch.get(link);
  return data;
};
