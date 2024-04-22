import { useState, useEffect } from 'react';
import axios from 'axios';

const api_base = "https://www.arbeitnow.com/api/job-board-api";

export default function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchString, setSearchString] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`${api_base}?search=${searchString}`);
            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchData();
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit}>
                <input type="text" value={searchString} onChange={handleSearchChange} placeholder="Search..." />
                <button type="submit">Search</button>
            </form>
            {searchResults.slice(0, 5).map((result, index) => (
                <div className='bg-gray-500 mb-2.5 ml-2.5 text-white' key={index}>
                    <p>Title: {result.title}</p>
                    <p>Company Name: {result.company_name}</p>
                </div>
            ))}
        </div>
    );
}