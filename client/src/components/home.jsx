import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api_base = "http://localhost:3000/apis/jobs";
const fav_base = "http://localhost:3000/users/";

const Home = ({ searchQuery }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(api_base);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateInput) => {
        if (!isNaN(dateInput)) {
            const date = new Date(dateInput * 1000);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        } else {
            return dateInput;
        }
    };

    const addToFavorites = (job) => {
        const token = localStorage.getItem('token');
        console.log(token);

        axios.post(`${fav_base}job/new`, { jobId: job.slug }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const removeFromFavorites = (job) => {
    const token = localStorage.getItem('token');
    console.log(token);

    axios.post(`${fav_base}job/remove`, { jobId: job.slug }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    let jobsToDisplay = [];

    if (searchResults) {
        if (searchQuery) {
            jobsToDisplay = searchResults.filter(result => {
                let title = Array.isArray(result.title) ? result.title[0] : result.title;
                let company_name = Array.isArray(result.company_name) ? result.company_name[0] : result.company_name;
                let location = Array.isArray(result.location) ? result.location[0] : result.location;
            
                return (
                    (typeof title === 'string' && title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (typeof company_name === 'string' && company_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (typeof location === 'string' && location.toLowerCase().includes(searchQuery.toLowerCase()))
                );
            });
        } else {
            jobsToDisplay = searchResults;
        }
    }

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobsToDisplay.slice(0, 50).map((result, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 rounded p-4 border border-gray-300 min-h-64" 
                    >
                        <Link to={{ pathname: `/job/${result.slug}`, state: { jobDetails: result } }}>
                            <h2 className="text-lg font-bold mb-2">{result.title}</h2>
                        </Link>
                        <p className="text-gray-600">Company: {result.company_name}</p>
                        <p className="text-gray-600">Location: {result.location}</p>
                        <p className="text-gray-600">Posted: {formatDate(result.created_at)}</p>
                        <button onClick={() => addToFavorites(result)} className="bg-gray-600 text-white px-3 py-2 mt-4 rounded hover:bg-blue-600">
                            Add to Favorites
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
