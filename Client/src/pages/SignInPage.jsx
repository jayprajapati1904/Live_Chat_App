import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Lock, Mail, MessageSquare, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { authstore } from "../store/authStore.js";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { signin, isSigninUser } = authstore();

  // Handle form validation
  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");

    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signin(formData);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-15">
      {/* Left Side */}
      <div className="pt-24 flex-1 text-white flex flex-col justify-center items-center p-5">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-300">
          Welcome back to <span className="text-red-400">Live Chat</span>
        </h1>
        <p className="text-lg text-center max-w-md text-yellow-300">
          Reconnect with your friends and enjoy real-time communication. Sign in
          to your account.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex-1 min-h-screen items-center justify-center p-5 pt-20 ">
        <div className="w-full max-w-md  mt-7  rounded-xl py-8 px-5 ">
          <div className="text-center mb-7">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2 text-gray-600">Sign In</h1>
              <p className="text-gray-500">Access your account</p>
            </div>
          </div>
          <Form layout="vertical">
            {/* Email Field */}
            <Form.Item required>
              <Input
                prefix={<Mail size={18} className="text-gray-500" />}
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-gray-400 rounded-lg px-2.5 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition mt-5"
              />
            </Form.Item>

            {/* Password Field */}
            <Form.Item required>
              <Input.Password
                prefix={<Lock size={18} className="text-gray-500" />}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                iconRender={(visible) =>
                  visible ? (
                    <Eye
                      size={18}
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer text-gray-400"
                    />
                  ) : (
                    <EyeOff
                      size={18}
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer text-gray-400"
                    />
                  )
                }
                className="border-gray-400 rounded-lg px-2.5 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition mt-5"
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
              <Button
                type="primary"
                block
                loading={isSigninUser}
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary-dark rounded-lg py-5 font-semibold text-white transition mt-5"
              >
                {isSigninUser ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </Form.Item>
          </Form>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-primary font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
