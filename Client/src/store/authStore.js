import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const authstore = create((set) => ({
  authUser: null,
  isSignupUser: false,
  isSigninUser: false,
  isUpdateProfile: false,

  ischeckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.error(error);
      set({ authUser: null });
    } finally {
      set({ ischeckingAuth: false });
    }
  },
}));
