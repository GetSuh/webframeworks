import"./styles.css"
import './App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Home</div>,
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
