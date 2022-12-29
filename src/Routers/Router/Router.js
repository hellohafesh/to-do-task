import { createBrowserRouter } from "react-router-dom";
import Loader from "../../Component/Loader/Loader";
import Main from "../../Layout/Main/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import CompleteTask from "../../Pages/CompleteTask/CompleteTask";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import MyTask from "../../Pages/MyTask/MyTask";
import Signin from "../../Pages/Signin/Signin";
import TaskDetails from "../../Pages/TaskDetails/TaskDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/addtask',
                element: <AddTask></AddTask>
            },
            {
                path: '/task',
                element: <MyTask></MyTask>
            },
            {
                path: '/task/details',
                element: <PrivateRoute><TaskDetails></TaskDetails></PrivateRoute>
            },
            {
                path: '/complete',
                element: <CompleteTask></CompleteTask>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signin',
                element: <Signin></Signin>
            }
        ]
    }
])
export default router;