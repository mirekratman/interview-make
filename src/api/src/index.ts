'use strict';

import 'dotenv/config';
import express, { Application } from 'express';
import session from 'express-session';
import indexRoutes from 'lib/routes/index';
import apiRoutes from 'lib/routes/api';

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

// Handle routes
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// Establish server
app.listen(appPort, () => {
    console.log(`Server is running on port ${appPort}`);
});
