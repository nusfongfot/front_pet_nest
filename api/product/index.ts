import apiFetch from "@/helpers/interceptors";

export const getAllProductApi = async () => {
  const link = "/product/all";
  const { data } = await apiFetch.get(link);
  return data;
};
