import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './components/login.jsx';
import LoginActually from './components/login_actually.jsx';
import WeeklyCalendar from './components/RecordList.jsx';
import Record from './components/Record.jsx';
import ErrorPage from "./components/ErrorPage.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginActually />,
  },
  {
    path: "/calendar",
    element: <WeeklyCalendar />,
  },
  {
    path: "/record/:id?",
    element: <Record />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);