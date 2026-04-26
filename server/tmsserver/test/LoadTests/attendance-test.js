import http from 'k6/http';
import { check, sleep } from 'k6';

// Read the test type from the terminal (defaults to 'stress' if not specified)
// To trigger spike, run: k6 run -e TEST_TYPE=spike attendance-test.js
const testType = __ENV.TEST_TYPE || 'stress';

export const options = {
    // Dynamically assign stages based on the testType configuration
    stages: testType === 'spike' ? [
        { duration: '2s', target: 100 },  // Sudden Spike: 0 to 100 users in 2 seconds
        { duration: '15s', target: 100 }, // Hold the massive surge of traffic
        { duration: '10s', target: 0 },   // Cool down phase
    ] : [
        { duration: '10s', target: 20 },  // Stress: Gradual ramp-up to 20 users
        { duration: '15s', target: 20 },  // Hold the sustained load
        { duration: '10s', target: 0 },   // Gradual ramp-down phase
    ],
    thresholds: {
        // Performance requirement: 95% of all requests must complete under 1 second (1000ms)
        http_req_duration: ['p(95)<1000'], 
        // Reliability requirement: The test fails if a single request drops (0% failure rate)
        http_req_failed: ['rate==0.00'],   
    },
};

export default function () {
    // --- DYNAMIC URL CONFIGURATION ---
    // Reads the base URL from the terminal environment variable. 
    // If not provided, it safely defaults to your local ASP.NET Core backend.
    // To test a deployed site, run: k6 run -e BASE_URL=https://your-live-site.com attendance-test.js
    const BASE_URL = __ENV.BASE_URL || 'http://localhost:5011';
    
    // Construct the full endpoint URL dynamically using template literals
    const url = `${BASE_URL}/api/auth/login`;
    // ---------------------------------
    
    // The exact JSON payload needed to authenticate
    const payload = JSON.stringify({
        username: 'akinda123@sliit.lk',
        password: 'Akinda123'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // Execute the POST request to the server
    const res = http.post(url, payload, params);

    // Assertions to verify the server responded correctly
    check(res, {
        'Status is 200 OK': (r) => r.status === 200,
    });

    // Simulates "think time" so virtual users don't instantly loop and act like a DDoS attack
    sleep(1); 
}