import { useState, useEffect } from 'react';
import axios from 'axios';

const api_base = "https://www.arbeitnow.com/api/job-board-api";

export default function Home() {
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

    return (
        <div>

            {searchResults.slice(0, 5).map((result, index) => (
                <div className='bg-gray-500 mb-2.5 ml-2.5 text-white'>
                    <div key={index}>
                        <p>Title: {result.title}</p>
                        <p>Company Name: {result.company_name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}