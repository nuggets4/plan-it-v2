import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/Login.jsx';
import ErrorPage from "./components/ErrorPage.jsx"; 
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Make this the default route for "/"
    errorElement: <ErrorPage />,
  },
  {
    path: "*", // Catch-all for undefined routes
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
