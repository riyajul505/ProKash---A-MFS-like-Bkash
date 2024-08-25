import {
  createBrowserRouter
} from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <></>,
      children: [
        {
          path: '/',
          element: <Login/>
        },
        {
          path: '/registration',
          element: <Registration/>
        },
      ]
    },
    {
      path: '/dashboard',
      element: <Dashboard/>,
      children: [
        {
          path: '/dashboard',
          element: <Home/>
        }
      ]
    }
  ]);


export default router;