import Login from "./components/login";
import Home from "./components/home";
import Signup from "./components/signup";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Home />} path="/" exact />
                    </Route>
                    <Route element={<Login />} path="/login" />
                    <Route element={<Signup />} path="/signup" />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
