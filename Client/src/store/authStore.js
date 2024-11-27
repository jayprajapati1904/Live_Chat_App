import { create } from "zustand";
import toast from "react-hot-toast";
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

  signup: async (data) => {
    set({ isSignupUser: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);
      console.log(res);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSignupUser: false });
    }
  },

  signin: async (data) => {
    set({ isSigninUser: true });
    try {
      const res = await axiosInstance.post("/auth/signin", data);

      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigninUser: false });
    }
  },
}));
