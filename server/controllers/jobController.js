const axios = require('axios');

const arbeitnow = async (req, res) => {
    try {
        const apiUrl = 'https://arbeitnow.com/api/job-board-api';
        const response = await axios.get(apiUrl);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch data" });
    }
};

const arbeitnowOnlyOne = async (req, res) => {
    try {
        const { slug } = req.params;
        const apiUrl = `https://arbeitnow.com/api/job-board-api`;
        const response = await axios.get(apiUrl);

        const job = response.data.data.find((job) => job.slug === slug);
        if (!job) {
            return res.status(404).send({ error: "Job not found" });
        }

        res.send({ data: job });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch data" });
    }
};


module.exports = {
    arbeitnow,
    arbeitnowOnlyOne,
};
