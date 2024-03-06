import Login from "./components/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home";
import Signup from "./components/signup";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/",
        element: <Home />
    },
]);


function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
