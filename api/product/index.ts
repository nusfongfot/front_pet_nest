import apiFetch from "@/helpers/interceptors";

export const getAllProductApi = async () => {
  const link = "/product/all";
  const { data } = await apiFetch.get(link);
  return data;
};

export const getDetailsProduct = async (id: string) => {
  const link = `/product/detail/${id}`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const getAllProductByCategory = async (cate: string) => {
  const link = `/product/all/cate/${cate}`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const getAllProductByRecommend = async () => {
  const link = `/product/all/recommend`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const getAllListOfBrand = async () => {
  const link = `/product/all/brand`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const getAllProductByBrand = async (name: string) => {
  const link = `/product/all/brand/${name}`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const searchProduct = async (q: string) => {
  const link = `/product/search?keyword=${q}`;
  const { data } = await apiFetch.get(link);
  return data;
};
