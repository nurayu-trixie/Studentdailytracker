import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { History } from "./pages/History";
import { Profile } from "./pages/Profile";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/dashboard",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "history",
        Component: History,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
]);
