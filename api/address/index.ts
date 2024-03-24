import apiFetch from "@/helpers/interceptors";

export const getSeletedAddress = async (id: string) => {
  const link = `/address/user/selected?userId=${id}`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const getAllAddressOfUser = async (id: string) => {
  const link = `/address/user?userId=${id}`;
  const { data } = await apiFetch.get(link);
  return data;
};

export const createAddress = async (body: object) => {
  const link = `/address/insert`;
  const { data } = await apiFetch.post(link, body);
  return data;
};

export const editAddress = async (addId: string, body: object) => {
  const link = `/address/edit?addressId=${addId}`;
  const { data } = await apiFetch.put(link, body);
  return data;
};

export const deleteAddress = async (addId: string) => {
  const link = `/address/delete?addressId=${addId}`;
  const { data } = await apiFetch.delete(link);
  return data;
};

export const updateSelectedAddressByUser = async (
  addressId: string,
  userId: string
) => {
  const link = `/address/edit/selected?addressId=${addressId}&userId=${userId}`;
  const { data } = await apiFetch.get(link);
  return data;
};
