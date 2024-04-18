'use strict';

import express, { Request, Response } from 'express';

const indexRoutes = express.Router();

// Handle root route
indexRoutes.get('/', (req: Request, res: Response) => {
    res.send(`Cat API service is working`);
});

// Handle health route
indexRoutes.use('/health', (req: Request, res: Response) => {
    try {
        res.send('OK');
    } catch (err) {
        console.error(err);
        // INFO - If instance will be really died we will get 404 and there will be no response at all.
        res.send('DIED');
    }
});

export default indexRoutes;
