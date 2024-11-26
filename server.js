const express = require('express');
const path = require('path');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const favicon = require('serve-favicon');

// Import API routes
const apiRoutes = require('./public/api');

const app = express();
const port = process.env.PORT || 3000;

// Middleware: Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Middleware: Enable compression
app.use(compression());

// Middleware: Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Middleware: Log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the API routes
app.use('/api', apiRoutes);

// Serve home.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Serve search.html for the /search route
app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
});

// Custom 404 Page
app.use((req, res) => {
    res.status(404).send(`
        <html>
            <head>
                <title>404 - Page Not Found</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #121212;
                        color: #eaeaea;
                        text-align: center;
                        padding: 50px;
                    }
                    a {
                        color: #ffa500;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <h1>Oops! Page Not Found</h1>
                <p>We couldn't find the page you were looking for.</p>
                <p><a href="/">Go back to Home</a></p>
            </body>
        </html>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
