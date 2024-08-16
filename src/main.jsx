import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./Authentication/AuthProvider.jsx";
import Login from "./Authentication/Login.jsx";
import Home from "./Pages/Home.jsx";
import SignUp from "./Authentication/SignUp.jsx";
import PrivateRoute from "./Authentication/PrivateRoute.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <PrivateRoute><Home/></PrivateRoute>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <SignUp/>
      }
    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
