import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Root from "./pages/Root/Root";
import Error from "./pages/Error/Error";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  }
  
])


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
