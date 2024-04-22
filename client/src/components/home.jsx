import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Multiplicado por 1000 para obter milissegundos
        return date.toLocaleString(); // Converte para a data e hora local
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.slice(0, 50).map((result, index) => (
                <Link to={`/job/${result.id}`} key={index}>    
                    <div
                        key={index}
                        className="bg-gray-200 rounded p-4 border border-gray-300"
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
}