import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";

import Header from "./header.jsx";
import OfficialLogin from "./Official/Login.jsx";
import OfficialHome from "./Official/Home.jsx";
import OfficialForm from "./Official/Form.jsx";
import UserRegistration from "./User/Register.jsx";
import UserLogin from "./User/Login.jsx";
import UserHome from "./User/Home.jsx";
import UserFillForm from "./User/FillForm.jsx";

function HeaderWithReload() {
  const location = useLocation();
  return <Header key={location.pathname} />;
}

// --- Layout Components ---
// UserLayout wraps all /User routes
function UserLayout() {
  return (
    <>
      <HeaderWithReload/>
      <Outlet />
    </>
  );
}

// OfficialLayout wraps all /Official routes
function OfficialLayout() {
  return (
    <>
      <HeaderWithReload />
      <Outlet />
    </>
  );
}

// --- Router Setup ---
const router = createBrowserRouter([
  {
    path: "/User",
    element: <UserLayout />,
    children: [
      { path: "Register", element: <UserRegistration /> },
      { path: "Login", element: <UserLogin /> },
      { path: "Home", element: <UserHome /> },
      { path: "FillForm", element: <UserFillForm /> },
    ],
  },
  {
    path: "/Official",
    element: <OfficialLayout />,
    children: [
      { path: "Login", element: <OfficialLogin /> },
      { path: "Home", element: <OfficialHome /> },
      { path: "Form/:formID", element: <OfficialForm /> },
    ],
  },
  { path: "/", element: <><HeaderWithReload/><OfficialLogin/></> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;