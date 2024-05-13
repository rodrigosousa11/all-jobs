import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const api_base = "http://localhost:3000/apis/2jobs";

export default function JobDetails() {
    const [jobDetails, setJobDetails] = useState(null);
    const [error, setError] = useState('');
    const { slug } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data for slug:", slug);
                if (!slug) return;
                const response = await axios.get(`${api_base}/${slug}`);
                console.log("Response data:", response.data); 
                const job = response.data.data;
                if (job) {
                    console.log("Job details:", job); 
                    setJobDetails(job);
                } else {
                    throw new Error('Job not found');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load job details');
            }
        };
    
        fetchData();
    }, [slug]);
    

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString();
    };

    return (
        <div className="p-4">
            {jobDetails ? (
                <div className="bg-gray-200 rounded p-4 border border-gray-300">
                    <h2 className="text-lg font-bold mb-2">{jobDetails.title}</h2>
                    <p className="text-gray-600">Company: {jobDetails.company_name}</p>
                    <p className="text-gray-600">Location: {jobDetails.location}</p>
                    <p className="text-gray-600">Posted: {formatDate(jobDetails.created_at)}</p>
                    <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: jobDetails.description }}></p>
                    <button className="mt-3 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                        <a href={jobDetails.url} target="_blank" rel="noopener noreferrer" className="text-white">View Job</a>
                    </button>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>Loading job details...</p>
            )}
        </div>
    );
}
