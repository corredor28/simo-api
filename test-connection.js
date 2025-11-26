const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testEndpoint(endpoint) {
    try {
        console.log(`Testing ${endpoint}...`);
        const response = await axios.get(`${BASE_URL}${endpoint}`);
        console.log(`Status: ${response.status}`);
        console.log('Data sample:', JSON.stringify(response.data).substring(0, 100));
        console.log('---');
    } catch (error) {
        console.error(`Error testing ${endpoint}:`, error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
        }
    }
}

async function runTests() {
    // Wait for server to start (if running in parallel, but here we assume server is up)
    // We'll test a few endpoints
    await testEndpoint('/departamento');
    await testEndpoint('/niveles');
}

runTests();
