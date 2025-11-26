require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const TARGET_URL = process.env.TARGET_URL || 'https://simo.cnsc.gov.co';

app.use(cors());
app.use(express.json());

// Helper to forward requests
const forwardRequest = async (req, res) => {
    const url = `${TARGET_URL}${req.originalUrl}`;
    console.log(`Forwarding request to: ${url}`);

    try {
        const response = await axios({
            method: req.method,
            url: url,
            data: req.body,
            params: req.query,
            headers: {
                // Mimic a browser to avoid potential blocking
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json, text/plain, */*',
                // Forward authorization if needed, or other specific headers
                // 'Authorization': req.headers.authorization 
            }
        });

        // Forward the response data and status
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error(`Error forwarding to ${url}:`, error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            res.status(504).send('Gateway Timeout: No response received from target');
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).send('Internal Server Error: ' + error.message);
        }
    }
};

// Define endpoints to forward
const endpoints = [
    '/empleos',
    '/tipoprocesoseleccion',
    '/convocatorias',
    '/entidades',
    '/departamento',
    '/municipio',
    '/niveles',
    '/tipodiscapacidad'
];

// Register routes
endpoints.forEach(endpoint => {
    // Capture the endpoint and any sub-paths
    app.use(endpoint, forwardRequest);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Explicit wrapper for ${TARGET_URL}`);
});
