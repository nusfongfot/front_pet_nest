import apiFetch from "@/helpers/interceptors";

export const googleLoginOauth = async (body: object) => {
  const link = "/auth/google/login";
  const { data } = await apiFetch.post(link, body);
  return data;
};
