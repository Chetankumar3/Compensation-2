import { useLocation } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./Components/header.jsx";
import Login from "./Login.jsx";
import List from "./List.jsx";
import Form from "./Form.jsx";

function HeaderWithReload() {
  const location = useLocation();
  return <Header key={location.pathname} />;
}

const router = createBrowserRouter([
  { path: "/", element: <><HeaderWithReload /><Login /></> },
  { path: "/List", element: <><HeaderWithReload /><List /></> },
  { path: "/Form/:formID", element: <><HeaderWithReload /><Form /></> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;