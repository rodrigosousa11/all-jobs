import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const api_base = "http://localhost:3000/apis/jobs";
const fav_base = "http://localhost:3000/users/";

export default function JobDetails() {
    const [jobDetails, setJobDetails] = useState(null);
    const [error, setError] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);
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
                    checkIfFavorite(job.slug);
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
    
    const checkIfFavorite = async (jobSlug) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        try {
            const response = await axios.post(`${fav_base}job/isfavorite`, { jobId: jobSlug }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            setIsFavorite(response.data.isFavorite);
        } catch (error) {
            console.error('Error checking favorite status:', error);
        }
    };

    const handleFavoriteClick = async () => {
        if (isFavorite) {
            await removeFromFavorites(jobDetails.slug);
        } else {
            await addToFavorites(jobDetails.slug);
        }
        setIsFavorite(!isFavorite);
    };

    const addToFavorites = (jobSlug) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        return axios.post(`${fav_base}job/new`, { jobId: jobSlug }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error('Error adding to favorites:', error);
        });
    }

    const removeFromFavorites = (jobSlug) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        return axios.post(`${fav_base}job/remove`, { jobId: jobSlug }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error removing from favorites:', error);
            });
    }

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
                    <div className="mt-3 flex space-x-4">
                        <button className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                            <a href={jobDetails.url} target="_blank" rel="noopener noreferrer" className="text-white">View Job</a>
                        </button>
                        <button onClick={handleFavoriteClick} className="bg-gray-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                    </div>
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>Loading job details...</p>
            )}
        </div>
    );
}
