import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";
import { authstore } from "./store/authStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, ischeckingAuth } = authstore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (!authUser || ischeckingAuth) {
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-16 animate-spin text-green-500" />
    </div>;
  }
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={"/signin"} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/signin"
            element={!authUser ? <SignInPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to={"/signin"} />}
          />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
