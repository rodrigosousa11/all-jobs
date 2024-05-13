import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api_base = "http://localhost:3000/apis/jobs";

const Home = ({ searchQuery }) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(api_base);
                setSearchResults(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    };

    let jobsToDisplay = searchResults;

    if (searchQuery) {
        // Filter the results based on search query
        jobsToDisplay = searchResults.filter(result =>
            result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            result.location.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobsToDisplay.slice(0, 50).map((result, index) => (
                    <Link to={{ pathname: `/job/${result.slug}`, state: { jobDetails: result } }} key={index}>
                        <div
                            key={index}
                            className="bg-gray-200 rounded p-4 border border-gray-300 min-h-48" 
                        >
                            <h2 className="text-lg font-bold mb-2">{result.title}</h2>
                            <p className="text-gray-600">Company: {result.company_name}</p>
                            <p className="text-gray-600">Location: {result.location}</p>
                            <p className="text-gray-600">Posted: {formatDate(result.created_at)}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
