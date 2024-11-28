import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const authstore = create((set) => ({
  authUser: null,
  isSignupUser: false,
  isSigninUser: false,
  isUpdateProfile: false,
  onlineUsers: [],
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

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdateProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);

      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdateProfile: false });
    }
  },
}));
