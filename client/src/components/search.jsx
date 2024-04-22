import { useState, useEffect } from 'react';
import axios from 'axios';

const api_base = "https://www.arbeitnow.com/api/job-board-api";

export default function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [searchString, setSearchString] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);

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

    useEffect(() => {
        const lowerCaseSearchString = searchString.toLowerCase();

        const results = searchResults.filter(result =>
            result.title.toLowerCase().includes(lowerCaseSearchString) ||
            result.company_name.toLowerCase().includes(lowerCaseSearchString) ||
            (result.tags && result.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchString))) ||
            (result.job_types && result.job_types.some(type => type.toLowerCase().includes(lowerCaseSearchString))) ||
            (result.location && result.location.toLowerCase().includes(lowerCaseSearchString))
        );

        setFilteredResults(results);
    }, [searchString, searchResults]);

    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
    };

    return (
        <div>
            <input type="text" value={searchString} onChange={handleSearchChange} placeholder="Search..." />
            {filteredResults.slice(0, 5).map((result, index) => (
                <div className='bg-gray-500 mb-2.5 ml-2.5 text-white' key={index}>
                    <p>Title: {result.title}</p>
                    <p>Company Name: {result.company_name}</p>
                </div>
            ))}
        </div>
    );
}