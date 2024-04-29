import Login from "./components/login";
import Home from "./components/home";
import Signup from "./components/signup";
import Navbar from "./components/navbar";
import Favorites from "./components/favorites";
import Search from "./components/search";
import Job from "./components/job";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
    return (
        <div className="App flex flex-col h-screen">
            <Router>
                <Navbar />
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Favorites />} path="/fav" />
                    </Route>
                    <Route element={<Home />} path="/" exact />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Signup />} path="/signup" />
                    <Route element={<Search />} path="/search" />
                    <Route element={<Job />} path="/job/:slug" />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
