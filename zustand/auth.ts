import { create } from "zustand";

type AccInfo = {
  userId: string;
  email: string;
  name: string;
  picture: string;
  level: string;
};

type InfoStore = {
  accInfo: AccInfo;
  setInfo: (value: any) => void;
};

const useInfo = create<InfoStore>((set) => ({
  accInfo: {
    userId: "",
    email: "",
    name: "",
    picture: "",
    level: "",
  },
  setInfo: (value) =>
    set((state) => ({
      accInfo: value,
    })),
}));

export default useInfo;
