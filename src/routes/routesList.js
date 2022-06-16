import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("pages/Home/Home"));
const VibeCheck = lazy(() => import("pages/VibeCheck/VibeCheck"));
const Results = lazy(() => import("pages/Results/Results"));
const Messages = lazy(() => import("pages/VibeCheck/Messages"));

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/vibecheck",
    exact: true,
    component: VibeCheck
  },
  {
    path: "/myresults",
    exact: true,
    component: Results
  },
  {
    path: "/messages",
    exact: true,
    component: Messages
  },
  {
    path: "*",
    exact: true,
    component: () => <Navigate to="/" />
  }
];

export default routes;
