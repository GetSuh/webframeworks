import"./styles.css"
import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Root from "./components/Root/Root";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
