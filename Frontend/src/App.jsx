// import React from "react";
// import { Route, Routes } from "react-router";
// import HomePage from "./pages/HomePage.jsx";
// import CreatePage from "./pages/CreatePage.jsx";
// import NoteDetailPage from "./pages/NoteDetailPage.jsx";
// const App = () => {
//   return (
//     <div className="relative h-full w-full" data-theme="silk">
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/create" element={<CreatePage />} />
//         <Route path="/note/:id" element={<NoteDetailPage />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

// Utility to check login status
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Protected route wrapper
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <div className="relative h-full w-full" data-theme="forest">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreatePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/note/:id"
          element={
            <PrivateRoute>
              <NoteDetailPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
