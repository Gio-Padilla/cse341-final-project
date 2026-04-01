const express = require('express');
// body-parser is no longer needed in modern Express
const mongodb = require('./data/database');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

// Middleware
// Built-in JSON parser (replaces body-parser)
app.use(express.json());

// This middleware enables cross-origin requests by adding CORS headers
// NOTE: Using both manual headers AND cors() is redundant, so we simplify it
// NOTE: This replacesses all of the extra middleware from the other assignments.
app.use(cors({
    origin: '*', // ⚠️ In production, restrict this to your frontend URL
    // origin: ['https://yourfrontend.com']
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// Routes
app.use('/', require('./routes/index.js'));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error'
    });
});


// Start server // npm start
mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(PORT, () =>
            console.log(`Server running on ${HOST}:${PORT}`)
        );
    }
});