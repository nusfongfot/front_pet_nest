import apiFetch from "@/helpers/interceptors";

export const getReviewedUserAPI = async () => {
  const link = "/review/user";
  const { data } = await apiFetch.get(link);
  return data;
};

export const createReviewAPI = async (body: object) => {
  const link = "/review/insert";
  const { data } = await apiFetch.post(link, body);
  return data;
};
