'use strict';

import 'dotenv/config';
import express, { Application } from 'express';
import session from 'express-session';
import indexRoutes from 'lib/routes/index';
import apiRoutes from 'lib/routes/api';
import catsRoutes from 'lib/routes/cats';
import bodyParser from 'body-parser';
import cors from 'cors';

// config api
const app: Application = express();
const appPort: Number = Number(process.env.API_PORT);

// INFO - extra configuration for CORS depends on requirements
app.use(cors());

// INFO - Based on email discussion I will use express-session for session handling
// INFO - To avoid memory leaks, we should use some kind of session store like Redis
// INFO - https://github.com/make-hiring/cat-of-the-day-mirekratman/blob/main/server/app.ts#L8
app.use(
    // INFO - Potential memory leak
    session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true }
    })
);

// handle body parsing
// INFO - set data limit to 10MB
app.use(bodyParser.json({ limit: '10mb', type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Handle routes
// INFO for now I will use only /api route but this can be divided to more route handlers for clarity
app.use('/', indexRoutes);
app.use('/api', apiRoutes);
app.use('/api/cats', catsRoutes);

// Establish server
app.listen(appPort, () => {
    console.log(`Server is running on port ${appPort}`);
});

export default app;
