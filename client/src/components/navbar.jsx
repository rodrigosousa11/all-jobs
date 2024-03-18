import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [hasToken, setHasToken] = useState(false);

    const checkToken = () => {
        const token = localStorage.getItem("token");
        setHasToken(!!token);
    };

    useEffect(() => {
        checkToken();
    }, []); 

    const logout = () => {
        localStorage.removeItem("token");
        setHasToken(false);
    };

    return (
        <nav className="flex flex-wrap items-center justify-between bg-gray-800 p-5">
            <Link to="/" className="text-white text-xl font-bold w-full md:w-auto">zebbra.</Link>
            <div className="flex space-x-4 mt-4 md:mt-0">
                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                {hasToken && (
                    <Link to="/fav" className="text-white hover:text-gray-300">Favorites</Link>
                )}
                {!hasToken && (
                    <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
                )}
                {!hasToken && (
                    <Link to="/signup" className="text-white hover:text-gray-300">Register</Link>
                )}
                {hasToken && (
                    <button onClick={logout} className="text-white hover:text-gray-300">Logout</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
