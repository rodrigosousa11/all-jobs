import React, { useState } from 'react';
import Navbar from "./components/navbar";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import Favorites from "./components/favorites";
import Job from "./components/job";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [favoriteJobs, setFavoriteJobs] = useState([]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    const addToFavorites = (job) => {
        setFavoriteJobs(prevJobs => [...prevJobs, job]);
    };

    return (
        <div className="App flex flex-col h-screen">
            <Router>
                <Navbar onSearch={handleSearch} onClearSearch={clearSearch} />
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route element={<Favorites favorites={favoriteJobs} />} path="/fav" />
                    </Route>
                    <Route element={<Home searchQuery={searchTerm} addToFavorites={addToFavorites} />} path="/" exact />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Signup />} path="/signup" />
                    <Route element={<Job />} path="/job/:slug" />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
