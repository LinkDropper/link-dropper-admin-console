"user client";
import { create } from "zustand";

import { UserType } from "@/lib/types/user";

type UserStore = {
  isLoggedIn: boolean;
  user: UserType | null;
  setAuth: (isLoggedIn: boolean, user: UserType | null) => void;
};

const userStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  user: null,
  setAuth: (isLoggedIn, user) => set({ isLoggedIn, user }),
}));

export default userStore;
