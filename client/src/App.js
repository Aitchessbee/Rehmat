import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import RefSignup from "./pages/Signup/RefSignup";
import Root from "./pages/Root/Root";
import DocSignup from "./pages/Signup/DocSignup";
import Login from "./pages/Login/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/refsignup",
        element: <RefSignup />,
      },
      {
        path: "/docsignup",
        element: <DocSignup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
