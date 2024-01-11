import apiFetch from "@/helpers/interceptors";

export const getProfileOfUser = async () => {
  const link = "/users/my-profile";
  const { data } = await apiFetch.get(link);
  return data;
};
