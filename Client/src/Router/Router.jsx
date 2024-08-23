import {
  createBrowserRouter
} from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";


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
          path: 'registration',
          element: <Registration/>
        },
        

      ]
    },
  ]);


export default router;