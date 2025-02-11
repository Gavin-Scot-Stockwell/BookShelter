import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index2.css";

import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import MainPage from "./pages/MainPage.tsx";
import SavedBooksPage from "./pages/SavedBooksPage.tsx";
import Login from "./pages/Login.tsx";
import Contact from "./pages/ContactUs.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/saved-books",
        element: <SavedBooksPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/Contact",
        element: <Contact/>,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
