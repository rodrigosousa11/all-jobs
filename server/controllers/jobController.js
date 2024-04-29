const axios = require('axios');
const xml2js = require('xml2js');

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

const devitjobs = async (req, res) => {
    try {
        const devUrl = 'https://devitjobs.uk/job_feed.xml';
        const arbeitUrl = 'https://arbeitnow.com/api/job-board-api';
        const responseDev = await axios.get(devUrl);
        const responseArbeit = await axios.get(arbeitUrl);

        xml2js.parseString(responseDev.data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: "Failed to parse XML" });
            } else {
                const resultDev = result;
            }
        });

        /* Juntar o JSON resultDev ao responseArbeit */
        /* Diferença nas categorias:
        DevIt -- Arbeit
        company-name -- company_name
        created_at -- pubdate
        job-types -- job_types
        
        o Json do deviIt deve ter estas categorias mudadas para as do arbeit
        depois deve se combinar os dois e retornar
        */



    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch data" });
    }
};

const twofeed = async (req, res) => {
    try {
        const apiUrl = 'https://devitjobs.uk/job_feed.xml';
        const response = await axios.get(apiUrl);

        xml2js.parseString(response.data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: "Failed to parse XML" });
            } else {
                res.send(result);
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch data" });
    }
};


module.exports = {
    arbeitnow,
    arbeitnowOnlyOne,
    devitjobs,
};
