import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Navbar = ({ onSearch, onClearSearch }) => {
    const [hasToken, setHasToken] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        onClearSearch();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <nav className="flex flex-wrap items-center justify-between bg-gray-800 p-5">

            <Link to="/" className="text-white text-xl font-bold w-full md:w-auto" onClick={handleClearSearch}>
                zebbra.
            </Link>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">

                <input
                    type="text"
                    placeholder="Search jobs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress} // Add event listener for key press
                    className="px-2 py-1 rounded"
                />
                <button onClick={handleSearch} className="text-white bg-gray-600 px-2 py-1 rounded">Search</button>

                <Link to="/" className="text-white hover:text-gray-300" onClick={handleClearSearch}>Home</Link>
                
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
