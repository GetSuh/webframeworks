import { createBrowserRouter } from "react-router-dom";
import Root from "./layouts/Root";
import Home from "./pages/Home";
import Opdracht1 from "./pages/opdracht1";
import Opdracht2 from "./pages/opdracht2";
import Opdracht3 from "./pages/opdracht3";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "opdracht-1", element: <Opdracht1 /> },
      { path: "opdracht-2", element: <Opdracht2 /> },
      { path: "opdracht-3", element: <Opdracht3 /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
