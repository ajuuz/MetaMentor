import { create } from "zustand";

export type UserType = {
  _id:string
  name: string;
  email: string;
  role: "user" | "admin" | "mentor";
};

type UserStoreType = {
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
};

export const useUserStore = create<UserStoreType>((set) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  login(user) {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout() {
    set({ user: null });
    localStorage.removeItem("user");
    localStorage.removeItem("fcmToken");
  },
}));
