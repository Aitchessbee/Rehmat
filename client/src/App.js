import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import RefSignup from "./pages/Signup/RefSignup";
import Root from "./pages/Root/Root";
import DocSignup from "./pages/Signup/DocSignup";
import Login from "./pages/Login/Login";
import Error from "./pages/Error/Error";
import Donation from "./pages/Donation/Donation";
import Contact from "./pages/ContactUs/Contact";
import Meet from "./pages/live meeting/Meet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/refugee-signup",
        element: <RefSignup />,
      },
      {
        path: "/doctor-signup",
        element: <DocSignup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/donate",
        element: <Donation />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/meet",
        element: <Meet />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
