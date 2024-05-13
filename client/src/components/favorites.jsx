import React from 'react';

const Favorites = ({ favorites }) => {
    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Favorite Jobs</h1>
            {favorites.map((job, index) => (
                <div key={index} className="bg-gray-200 rounded p-4 border border-gray-300 mb-4">
                    <h2 className="text-lg font-bold mb-2">{job.title}</h2>
                    <p className="text-gray-600">Company: {job.company_name}</p>
                    <p className="text-gray-600">Location: {job.location}</p>
                </div>
            ))}
        </div>
    );
};

export default Favorites;
