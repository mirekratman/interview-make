'use strict';

import 'dotenv/config';
import express, { Application } from 'express';
import session from 'express-session';
import indexRoutes from 'lib/routes/index';
import apiRoutes from 'lib/routes/api';
import catsRoutes from 'lib/routes/cats';
import bodyParser from 'body-parser';

// config api
const app: Application = express();
const appPort: Number = Number(process.env.API_PORT);

// TODO not sure if necessary for test app
app.set('trust proxy', 1);

// TODO configure session properly
app.use(
    // TODO memory leak ?
    session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: true },
    })
);

app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Handle routes
// INFO for now I will use only /api route but this can be divided to more route handlers for clarity
app.use('/', indexRoutes);
app.use('/api', apiRoutes);
app.use('/api/cats', catsRoutes);

// Establish server
app.listen(appPort, () => {
    console.log(`Server is running on port ${appPort}`);
});
