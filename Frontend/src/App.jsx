import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashBoardPage from "./pages/DashBoardPage.jsx";
import { useAuth } from "./store/useAuthStore.js";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuth();
  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser) {
    return (
      <div className=" flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route
          element={authUser ? <DashBoardPage /> : <Navigate to="/login" />}
          path="/"
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
