import {
  createBrowserRouter
} from "react-router-dom";
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
        {
          path: '/home',
          element: <Home/>
        }
        

      ]
    },
  ]);


export default router;