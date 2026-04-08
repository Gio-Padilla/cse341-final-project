const express = require('express');
// body-parser is no longer needed in modern Express
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

// Middleware
// Built-in JSON parser (replaces body-parser)
app.use(express.json());

// Session middleware
// This is user from Passport to persistent login sessions
app.use(session({
    secret: process.env.SESSION_SECRET || "secret", // You would want a secret key when in production to secure the session
    resave: false,
    saveUninitialized: false, // This is good so that it does not create an empty session
}));

// Initialize Passport and restore authentication state from session
app.use(passport.initialize());
app.use(passport.session());

// This middleware enables cross-origin requests by adding CORS headers
// NOTE: Using both manual headers AND cors() is redundant, so we simplify it
// NOTE: This replacesses all of the extra middleware from the other assignments.
app.use(cors({
    origin: '*', // In production, restrict this to your frontend URL
    // origin: ['https://yourfrontend.com']
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));

// Routes
app.use('/', require('./routes'));

// Passport GitHub Strategy (OAuth setup)
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const db = mongodb.getDatabase().db();
        const githubId = profile.id; // Use GitHub ID as userId
        const email = profile.emails?.[0]?.value;

        // Look for existing user by GitHub ID
        let user = await db.collection('users').findOne({ userId: githubId });

        if (!user) {
            // Create a default user if not found
            const newUser = {
                userId: githubId, // GitHub ID as userId
                email: email || null,
                name: profile.displayName || profile.username || 'Default User',
                phone: '+0000000000',
                role: 'user'
            };

            await db.collection('users').insertOne(newUser);
            user = newUser;
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user.userId);
});

// Deserialize user from the session
passport.deserializeUser(async (userId, done) => {
    try {
        const db = mongodb.getDatabase().db();
        const user = await db.collection('users').findOne({ userId });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

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