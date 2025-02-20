import { useLocation } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./Administration/Components/header.jsx";
import Login from "./Administration/Login.jsx";
import List from "./Administration/List.jsx";
import Form from "./Administration/Form.jsx";
import User_Registration from "./User/Register.jsx";
import User_Login from "./User/User_Login.jsx";

function HeaderWithReload() {
  const location = useLocation();
  return <Header key={location.pathname} />;
}

const router = createBrowserRouter([
  { path: "/", element: <><HeaderWithReload /><User_Registration /></> },
  { path: "/User/Login", element: <><HeaderWithReload /><User_Login /></> },
  { path: "/Administration/Login", element: <><HeaderWithReload /><Login /></> },
  { path: "/Administration/List", element: <><HeaderWithReload /><List /></> },
  { path: "/Administration/Form/:formID", element: <><HeaderWithReload /><Form /></> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;