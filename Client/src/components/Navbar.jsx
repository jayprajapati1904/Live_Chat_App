import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authstore } from "../store/authStore";
import { LogOut, MessageSquare, Palette, User } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

export default function Navbar() {
  const { authUser, logout } = authstore();
  const { theme, setTheme } = useThemeStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "dracula",
    "winter",
    "nord",
    "corporate",
    "retro",
    "synthwave",
  ]; // Add your themes here

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
  backdrop-blur-lg bg-base-100/80 mb-10 shadow-2xl"
    >
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chat App</h1>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Theme Dropdown */}
            <div className="relative">
              <button
                className="btn btn-sm gap-2 transition-colors flex items-center rounded-lg"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <Palette className="w-4 h-4" />
                <span className="hidden sm:inline">Theme</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-gray-500 rounded-lg shadow-lg border border-gray-400 z-50">
                  <ul className="py-2">
                    {themes.map((t) => (
                      <li
                        key={t}
                        className={`px-4 py-2 hover:bg-gray-600 cursor-pointer ${
                          theme === t ? "font-bold text-primary" : ""
                        }`}
                        onClick={() => {
                          setTheme(t);
                          setDropdownOpen(false);
                        }}
                      >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Profile and Logout */}
            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2 rounded-lg">
                  <User className="size-5" />
                  <span className="hidden sm:inline  ">Profile</span>
                </Link>

                <button className="flex gap-2 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
